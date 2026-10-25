// Usage: npm run make-admin -- someone@example.com
// Needed once, because public registration can no longer create admins.
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/userModel');

(async () => {
  const email = (process.argv[2] || '').toLowerCase().trim();
  if (!email) {
    console.error('Usage: npm run make-admin -- <email>');
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOneAndUpdate({ email }, { role: 'admin' }, { new: true });
    if (!user) {
      console.error(`No user found with email ${email}`);
      process.exit(1);
    }
    console.log(`${user.email} is now an admin`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
})();
