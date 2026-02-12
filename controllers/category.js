const { validate } = require("uuid")
const fs=require('fs')
const Attendence = require('../models/categoryies')
const path = require("path")
exports.CreateAttendce = async (req, res) => {
    console.log(req.files)
    try {
        // console.log(req.file.filename)
        const { cDt, category_name, publish_Id, description, publish, SeqNo } = req.body
        const pic = req.files?.pic?.[0]?.filename || null;
        const banner = req.files?.banner?.[0]?.filename || null;
        if (!category_name || !publish_Id || !SeqNo) {
            return res.status(400).json({ message: 'fields are missing' })
        }

        const attendences = await Attendence.create({ cDt, category_name, publish_Id, description, publish, SeqNo, pic, banner })
        res.status(201).json({ message: 'attendence', attendences })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.AllAttendence = async (req, res) => {
    try {
        const attendence = await Attendence.findAll()
        if (attendence.length === 0) {
            return res.status(404).json({ message: 'attendence history is not found' })
        }
        res.status(200).json({ message: 'attendence is', attendence })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.Attendences = async (req, res) => {
    try {
        const { id } = req.params
        if (!validate(id)) {
            return res.status(400).json({ message: 'id is invalid' })
        }
        const result = await Attendence.findByPk(id)
        if (!result) {
            return res.status(401).json({ message: 'attendence is not found' })
        }
        res.status(200).json({ message: 'attendence is', result })
    } catch (error) {
        return res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.updateCategory = async (req, res) => {

  try {

    const { id } = req.params;

    const category = await Attendence.findByPk(id);
console.log(category)
    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    // ---------- DELETE OLD PIC ----------
    if (req.files?.pic?.[0]) {

      const oldPic = category.dataValues.pic;

      if (oldPic) {

        const oldPicPath = path.join(
          __dirname,
          "../uploads",
          oldPic.toString()
        );

        if (fs.existsSync(oldPicPath)) {
          fs.unlinkSync(oldPicPath);
        }
      }

      category.pic = req.files.pic[0].filename;
    }

    // ---------- DELETE OLD BANNER ----------
    if (req.files?.banner?.[0]) {

      const oldBanner = category.dataValues.banner;

      if (oldBanner) {

        const oldBannerPath = path.join(
          __dirname,
          "../uploads",
          oldBanner.toString()
        );

        if (fs.existsSync(oldBannerPath)) {
          fs.unlinkSync(oldBannerPath);
        }
      }

      category.banner = req.files.banner[0].filename;
    }

    // ---------- UPDATE OTHER FIELDS ----------

    category.dataValues.category_name =
      req.body.category_name || category.dataValues.category_name;

    category.publish =
      req.body.publish || category.dataValues.publish;

    category.SeqNo =
      req.body.SeqNo || category.dataValues.SeqNo;

    category.description =
      req.body.description || category.dataValues.description;

    await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      data: category
    });

  }
  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

exports.DeleteAttendence = async (req, res) => {
    try {
        const { id } = req.params
        if (!validate(id)) {
            return res.status(400).json({ message: 'id is invalid' })
        }
        const result = await Attendence.findByPk(id)
        // console.log(result)
        if (!result) {
            return res.status(401).json({ message: 'attendence is not found' })
        }
        if(result.dataValues.pic )
            
        {
            const picName = result.dataValues.pic
    ? result.dataValues.pic.toString()
    : null;
            const filepath=path.join(__dirname,'../uploads',picName )
            fs.unlink(filepath,(err)=>{
                if(err)
                {
                    return res.status(400).json({message:'some error is occured'})
                }
            })
        }
        if(result.dataValues.banner )
            
        {
            const picName = result.dataValues.banner
    ? result.dataValues.pic.toString()
    : null;
            const filepath=path.join(__dirname,'../uploads',picName )
            fs.unlink(filepath,(err)=>{
                if(err)
                {
                    return res.status(400).json({message:'some error is occured'})
                }
            })
        }

        const updateattendence = await Attendence.destroy({ where: { id: id } })
        if (!updateattendence) {
            return res.status(404).json({ message: 'can"t update the update the attendence  ' })
        }
        res.status(200).json({ message: 'attendence is', updateattendence })
    } catch (error) {
        return res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}    
