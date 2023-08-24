const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const users = [
  { id: 1, email: "muhammadiyevj72@gmail.com", contact: "123456789" },
];

const contactResetTokens = {};

const adminLogin = (req, res) => {
  const { email } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const resetToken = jwt.sign(
    { userId: user.id, type: "contact" },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );
  const tokenData = {
    code: uuidv4().substr(0, 6), // 6-character code
    token: resetToken,
  };
  contactResetTokens[resetToken] = tokenData;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "muhammadiyevj768@gmail.com",
      pass: "cytbrzdrnxhrohyu",
    },
  });

  const resetURL = `http://localhost:5000/pass/code/${encodeURIComponent(
    tokenData.code
  )}`;

  const mailOptions = {
    from: "muhammadiyevj768@gmail.com",
    to: email,
    subject: "Contact Reset",
    text: `Click the following link to reset your contact: ${resetURL}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while sending the email" });
    } else {
      console.log("Email sent:", info.response);
      res.json({ message: "Contact reset email sent successfully" });
    }
  });
};

const resetcontact = (req, res) => {
  const { token } = req.params;
  const { code, contact } = req.body;

  const tokenData = contactResetTokens[token];

  if (!tokenData) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }

  if (tokenData.code !== code) {
    return res.status(400).json({ error: "Invalid verification code" });
  }

  const user = users.find((user) => user.id === tokenData.userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.contact = contact;

  delete contactResetTokens[token];

  res.json({ message: "Contact reset successful" });
};
const getTokenByCode = (req, res) => {
  const { code } = req.params;

  const tokenData = Object.values(contactResetTokens).find(
    (data) => data.code === code
  );

  if (!tokenData) {
    return res.status(404).json({ error: "Token not found" });
  }

  const { token } = tokenData;

  res.json({ token });
};

module.exports = {
  adminLogin,
  resetcontact,
  getTokenByCode,
};
