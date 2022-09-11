const config = require('config');


console.log('Application Name:', config.get('name'));
console.log('Mail Server Name:', config.get('mail.post'));