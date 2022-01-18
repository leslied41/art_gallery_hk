import nodemailer from "nodemailer";
import { node } from "prop-types";
const handler = async (req, res) => {
  const { fullName, dateTime, headCount, remarks, email } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  try {
    const message = await transporter.sendMail({
      from: email,
      to: "info@phdgroup.art",
      subject: `appointment from ${fullName}`,
      html: `<p>You have a new appointment</p>
      <p>Name:${fullName}<p/>
      <p>Email:${email}<p/>
      <p>date&time:${dateTime}<p/>
      <p>head cound:${headCount}<p/>
      <p>remarks:${remarks}<p/>`,
    });
    console.log("Email sent", message.messageId);
  } catch (err) {
    console.error(err);
  }

  res.status(200).json(req.body);
};

export default handler;
