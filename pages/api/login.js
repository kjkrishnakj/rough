import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
var jwt = require('jsonwebtoken');
const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ "email": req.body.email })
        if (user) {
            if (req.body.email == user.email && req.body.password == user.password) {
                var token = jwt.sign({  email: user.email, name: user.name}, process.env.JWT_SECRET,{expiresIn:"2d"});
                res.status(200).json({success:true,token,email:user.email});
            }
            else{

                res.status(200).json({ success: false,error:"no user found" });
            }
            
        } else {
            res.status(200).json({ success: false,error:"invalid credentials" });

        }
    }
    else {
        res.status(400).json({ error: "error" });

    }
}

export default connectDb(handler)
