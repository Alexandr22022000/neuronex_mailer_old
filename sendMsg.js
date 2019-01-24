const nodemailer = require('nodemailer'),
    config = require('./config'),
    store = require('./store');

module.exports = (msg) => {
    if (!store.driver) {
        store.driver = nodemailer.createTransport(config.connection);
        if (config.needLogs) console.log("Mailer driver started!");
    }

    if (config.isLow) {
        setTimeout(() => {
            if (store.lastMsg > (new Date().getTime() - (config.timer - 10)) || !store.driver) return;

            store.driver.close();
            store.driver = null;

            if (config.needLogs) console.log("Mailer driver stopped!");
        }, config.timer);
    }

    return new Promise((resolve, reject) => {
        store.driver.sendMail(msg, (err, info) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }

            if (config.needLogs) console.log("Message sent: " + info.response);
            resolve();
        });
    });
};