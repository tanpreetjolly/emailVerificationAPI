let Userdb = require("../model/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.signup = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      nationality,
      age,
      gender,
      countryCode,
      contactNumber,
      password,
    } = req.body;

    if (!fname || !email || !password) {
      return res
        .status(400)
        .json({ status: "Success", message: "field is missing in Signup" });
    }
    const user = await Userdb.findOne({ email });
    if (user) {
      res.status(406).send({ message: "email already taken! Try another one" });
    } else {
      const salt = await bcrypt.genSalt(12);
      const hashpass = await bcrypt.hash(password, salt);
      let data = new Userdb({
        fname: fname,
        lname: lname,
        email: email,
        nationality: nationality,
        age: age,
        gender: gender,
        countryCode: countryCode,
        contactNumber: contactNumber,
        password: hashpass,
      });

      await data.save();
      const user = await Userdb.findOne({ email: email });
      const secret = user._id + process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ userID: user._id }, secret, {
        expiresIn: "15m",
      });
      const link = `${process.env.REACT_BASE_URL}/emailverifiedpage?userId=${user._id}&token=${token}`;
      console.log(link);
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST, 
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      let info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Please Verify Your Email",
        html: `<a href = ${link}>click here <a/>to verify your email `,
      });
      res.status(200).json({
        status: "success",
        message: "Verification Email sent to your mail id",
        info: info,
        Link: link,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error Occoured in registiring user" });
  }
};
