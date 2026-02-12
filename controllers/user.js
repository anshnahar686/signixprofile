const user = require('../models/login.js')
const sequilze = require('../config/connection.js')
const bycrypt = require('bcrypt')
const generate = require('jsonwebtoken')
const { validate } = require('uuid')
const generatesOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp

}
 const generateToken = (values) => {
    const token = generate.sign({ id: values.id, email: values.email, password: values.password }, process.env.SECREAT_KEY, { expiresIn: '3h' })
    console.log(token)
    return token
}
exports.Register = async (req, res) => {

    console.log(req.body)
    const { employee_code, first_name, last_name, date_of_joining, employment_type, status, email, phone, password, last_login } = req.body
    if (!employee_code || !first_name || !last_name || !date_of_joining || !employment_type || !status || !email || !phone || !password) {
        return res.status(300).json({ message: 'please Enter all fields' })
    }
    const users = await user.findOne({
        where: { email: email }
    })
    console.log(users)
    if (users) {
        return res.status(300).json({ message: 'user is exist ' })
    }
    const hashedpassword = await bycrypt.hash(password, 10)
    console.log(hashedpassword)
    const userss = await user.create({ employee_code, first_name, last_name, date_of_joining, employment_type, status, email, phone, password: hashedpassword, last_login })
    res.status(200).json({ message: 'user is created', userss })
}
exports.Login = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(411).json({ message: 'please Enter all fields' })
        }
        const finduser = await user.findOne({ where: { email: email } })

        if (!finduser) {
            return res.status(404).json({ message: 'user does not find' })
        }
        if (finduser.dataValues.status !== 'Active') {
            return res.status(400).json({ mesage: 'user is not activated' })
        }
        const comparePassword = await bycrypt.compare(password, finduser.dataValues.password)
        if (!comparePassword) {
            return res.status(401).json({ mesage: 'password does not matched' })
        }
        const otp = generatesOTP()
        const otp_expire = new Date(Date.now() + 5 * 60 * 1000)
        finduser.otp = otp
        finduser.otp_expiry = otp_expire
        await finduser.save()
        console.log(finduser.dataValues.email)
        res.cookie("otp_email", finduser.dataValues.email, {
            httpOnly: true,       // safer, prevents JS access
            secure: false,         // required with SameSite=None
            sameSite: "Lax",     // must be None for cross-site
            maxAge: 5 * 60 * 1000
        });
        res.status(200).json({ message: 'user is login successfully', otp })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }


}
exports.VerifyOTP = async (req, res) => {
    try {
        console.log(req.body)
        const email = req.cookies.otp_email;
        const { otp } = req.body;

        if (!email) {
            return res.status(401).json({ message: "Cookie not found" });
        }

        const finduser = await user.findOne({ where: { email } });

        if (!finduser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!finduser.otp) {
            return res.status(404).json({ message: "OTP not found" });
        }

        // convert to timestamp
        const expiryTime = new Date(finduser.dataValues.otp_expiry).getTime();
        const now = Date.now();

        const expired = finduser.dataValues.otp_expiry < new Date()



        console.log("Now:", now);
        console.log("Expiry:", expiryTime);
        console.log("Expired:", expired);

        // verify OTP
        if (!otp || finduser.otp !== otp || expired) {
            return res.status(400).json({
                message: expired ? "OTP expired" : "Invalid OTP"
            });
        }


        await finduser.update({
            otp: null,
            otp_expiry: null
        });
        res.clearCookie("otp_email", {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
        });
        const token = generateToken(finduser.dataValues)
        res.cookie("token", token, {
            httpOnly: true,       // safer, prevents JS access
            secure: true,         // required with SameSite=None
            sameSite: "Lax",       // must be None for cross-site
            maxAge: 5 * 60 * 1000
        })
        return res.status(200).json({
            message: "User verified successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

exports.GetUssers = async (req, res) => {
    try {
        const users = await user.findAll()
        if (users.length === 0) {
            return res.status(500).json({ message: 'users are not found ' })
        }
        res.status(200).json({ message: 'all users', users })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.UpdateUsers = async (req, res) => {
    const { id } = req.params
    if (!validate(id)) {
        return res.status(400).json({ message: 'id is invalid' })
    }
    const finduser = await user.findByPk(id)
    if (!finduser) {
        return res.status(400).json({ message: 'user is not found' })
    }
    const updateUser = await user.update(
        req.body,                     // values to update
        { where: { id: id } } // condition
    )

    if (!updateUser) {
        return res.status(400).json({ message: 'user cannot be updated' })
    }
    res.status(200).json({ message: 'user is updated successfully' })
}
exports.DeleteUser = async (req, res) => {
    const { id } = req.params
    if (!validate(id)) {
        return res.status(400).json({ message: 'id is invalid' })
    }
    const finduser = await user.findByPk(id)
    if (!finduser) {
        return res.status(400).json({ message: 'user is not found' })
    }
    const deleteuser = await user.destroy({ where: { id: id } })
    if (!deleteuser) {
        return res.status(400).json({ message: 'user is not deleted' })
    }
    res.status(200).json({ message: 'user is deleted successfully' })
}

exports.Getuser = async (req, res) => {
    try {
        const { id } = req.params
        if (!validate(id)) {
            return res.status(400).json({ message: 'id is invalid' })
        }
        const finduser = await user.findByPk(id)
        if (!finduser) {
            return res.status(400).json({ message: 'user is not found' })
        }
        res.status(200).json({ message: 'user ', finduser })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.mesage })
    }
}
exports.Logout = async (req, res) => {
    try {
        if (req.cookies) {
            Object.keys(req.cookies).forEach(cookieName => {
                res.clearCookie(cookieName, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "Lax"
                });
            });
        }
        res.status(200).json({ message: "All cookies cleared successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error clearing cookies" });
    }
};