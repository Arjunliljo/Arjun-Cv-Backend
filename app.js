const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hi");
});

app.post("/send-email", async (req, res) => {
  const { name, email, message, isHire } = req.body;

  const subject = isHire
    ? `${name} interested in hiring you`
    : `${name} wants to say hi`;

  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // let mailOptions = {
  //   from: email,
  //   to: "arjun7180@gmail.com",
  //   subject,
  //   text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  // };

  let mailOptions = {
    from: email,
    to: "arjun7180@gmail.com",
    subject: subject,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">New Message from Portfolio Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="padding: 10px; background-color: #f4f4f4; border-left: 4px solid #3498db;">${message}</p>
        </body>
      </html>
    `,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).send("Error sending email");
  }
});

module.exports = app;
