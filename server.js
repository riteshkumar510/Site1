const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Email setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_EMAIL@gmail.com',
    pass: 'YOUR_APP_PASSWORD'
  }
});

app.post('/order', async (req, res) => {
  const { cart, total } = req.body;

  let items = cart.map(i => `${i.name} x ${i.qty}`).join('\n');

  const mailOptions = {
    from: 'YOUR_EMAIL@gmail.com',
    to: 'riteshkumarluhana98@gmail.com',
    subject: 'New Order',
    text: `Order Details:\n${items}\nTotal: ₹${total}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});