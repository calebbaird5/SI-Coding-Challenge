require('dotenv').config();

const config = {
  username: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'mysql',
  logging: false,
};

module.exports = { development: config };
