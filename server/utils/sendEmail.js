const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'server71fi.axspace.com',
      port: 587,
      secure: false,
      auth: {
        user: 'noreply@pooyadhgh.com',
        pass: '3XW2CrjqmK02slN8',
      },
    });

    await transporter.sendMail({
      from: 'noreply@pooyadhgh.com',
      to: email,
      subject: subject,
      text: text,
    });

    console.log('email sent sucessfully');
  } catch (error) {
    console.log(error, 'email not sent');
  }
};

module.exports = sendEmail;
