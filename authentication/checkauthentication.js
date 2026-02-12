const jwt=require('jsonwebtoken')
exports.CheckAuthentication=(req,res)=>{
  const token = req.cookies.token;

    if (!token) {
      
        return res.status(401).json({ authenticated: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECREAT_KEY);

        res.status(200).json({
            authenticated: true,
            user: decoded
        });

    } catch (err) {
   
        res.status(401).json({
            authenticated: false
        });

    }
}