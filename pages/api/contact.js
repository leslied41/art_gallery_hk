// import nodemailer from "nodemailer";
// const handler = async (req, res) => {
//   const { fullName, CustomDatePicker, headCount, remarks, email } = req.body;
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.user,
//       pass: process.env.pass,
//     },
//   });

//   try {
//     const message = await transporter.sendMail({
//       from: email,
//       to: "info@phdgroup.art",
//       subject: `appointment from ${fullName}`,
//       html: `<p>You have a new appointment</p>
//       <p>Name:${fullName}<p/>
//       <p>Email:${email}<p/>
//       <p>date&time:${CustomDatePicker}<p/>
//       <p>head cound:${headCount}<p/>
//       <p>remarks:${remarks}<p/>`,
//     });
//     console.log("Email sent", message.messageId);
//   } catch (err) {
//     console.error(err);
//   }

//   res.status(200).json(req.body);
// };

// export default handler;

const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const handler = async (req, res) => {
  const { fullName, CustomDatePicker, headCount, remarks, email } = req.body;
  // const oAuth2client = new google.auth.OAuth2(
  //   process.env.CLIENT_ID,
  //   process.env.CLIENT_SECRET,
  //   process.env.REDIRET_URI
  // );
  // oAuth2client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  // const accessToken = await oAuth2client.getAccessToken();

  // const transport = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     type: "OAuth2",
  //     user: process.env.user,
  //     clientId: process.env.CLIENT_ID,
  //     clientSecret: process.env.CLIENT_SECRET,
  //     refreshToken: process.env.REFRESH_TOKEN,
  //     accessToken: accessToken,
  //   },
  // });
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.user,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: process.env.ACCESS_TOKEN,
      expires: 3600,
    },
  });

  const mailOptions = {
    from: email,
    to: "info@phdgroup.art",
    subject: `appointment from ${fullName}`,
    html: `<p>You have a new appointment</p>
      <p>Name:${fullName}<p/>
      <p>Email:${email}<p/>
      <p>date&time:${CustomDatePicker}<p/>
      <p>head cound:${headCount}<p/>
      <p>remarks:${remarks}<p/>`,
  };
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent", result.messageId);
  } catch (error) {
    console.log(error);
  }

  res.status(200).json(req.body);
};

export default handler;
