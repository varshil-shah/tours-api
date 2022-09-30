const path = require('path');

const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Varshil Shah <${process.env.EMAIL_FROM}>`;
  }

  createTransport() {
    if (process.env.NODE_ENV === 'production') {
      // send email using sendgrid (REMAINING TO IMPLEMENT)
      return nodemailer.createTransport({
        service: 'SendinBlue',
        auth: {
          user: process.env.SEND_IN_BLUE_EMAIL,
          pass: process.env.SEND_IN_BLUE_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // send actual email
  async send(template, subject) {
    // render html file based on pug template
    const html = pug.renderFile(
      path.join(__dirname, '../', 'views', 'email', `${template}.pug`),
      { firstName: this.firstName, url: this.url, subject }
    );

    // define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    // create a transport and send email
    await this.createTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};
