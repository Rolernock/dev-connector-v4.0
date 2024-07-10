import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
  const message = {
    from: `mernDevs <rolernockgoines@gmail.com>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  }
  await transporter.sendMail(message)
}

export default sendEmail
