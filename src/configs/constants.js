// console.log({env:process.env})

module.exports = {
  mongoURI: process.env.MONGO_URI || '',
  APP_SECRET_KEY: process.env.APP_SECRET_KEY || 'keyboard',
  MAIL_EMAIL: process.env.MAIL_EMAIL,
  MAIL_PASS: process.env.MAIL_PASS,
  PAYSTACK_AUTHORIZATION_TOKEN: process.env.PAYSTACK_AUTHORIZATION_TOKEN,
  MAILCHIMP_AUDIENCE_ID:process.env.MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_API_KEY:process.env.MAILCHIMP_API_KEY,
  FRONTEND_BASE_URL:process.env.FRONTEND_BASE_URL || 'http://localhost:3000'
  // 'Bearer sk_test_a1afb90a2216f7ce7d58e51d586ae5792d86ef90'
};
