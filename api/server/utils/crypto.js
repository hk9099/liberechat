require('dotenv').config();

const crypto = require('crypto');
const key = Buffer.from('f34be427ebb29de8d88c107a71546019685ed8b241d8f2ed00c3df97ad2566f0', 'hex');
const iv = Buffer.from('e2341419ec3dd3d19b13a1a87fafcbfb', 'hex');
const algorithm = 'aes-256-cbc';

function encrypt(value) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(value, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encryptedValue) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedValue, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Programatically generate iv
function encryptV2(value) {
  const gen_iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, gen_iv);
  let encrypted = cipher.update(value, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return gen_iv.toString('hex') + ':' + encrypted;
}

function decryptV2(encryptedValue) {
  const parts = encryptedValue.split(':');
  // Already decrypted from an earlier invocation
  if (parts.length === 1) {
    return parts[0];
  }
  const gen_iv = Buffer.from(parts.shift(), 'hex');
  const encrypted = parts.join(':');
  const decipher = crypto.createDecipheriv(algorithm, key, gen_iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { encrypt, decrypt, encryptV2, decryptV2 };
