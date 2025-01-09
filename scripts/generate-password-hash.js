const bcrypt = require('bcrypt');

const password = process.argv[2];

if (!password) {
    console.error('Please provide a password as an argument:');
    console.error('Usage: node generate-password-hash.js "your-password"');
    process.exit(1);
}

const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error('Error generating hash:', err);
        return;
    }
    console.log('Password:', password);
    console.log('Hash:', hash);
});
