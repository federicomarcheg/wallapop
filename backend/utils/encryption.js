const crypto = require('crypto');


const ENCRYPTION_KEY = crypto.randomBytes(32);
const IV_LENGTH = 16;


exports.encrypt = (text) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString( 'hex' )}:${encrypted}`;
};


exports.decrypt = (encrypted) => {
    const [iv, content] = encrypted.split(':');
    const decipher = crypto.createCipheriv('aes-128-cbc', ENCRYPTION_KEY, buffer.from(iv, 'hex'));
    let decrypted = decipher.update(content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};