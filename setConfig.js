const config = require('./config'),
    store = require('./store');

module.exports = (connection, timer, isLow, needLogs) => {
    config.connection = connection;

    if (timer !== undefined) config.timer = timer;
    if (isLow !== undefined) config.isLow = isLow;
    if (needLogs !== undefined) config.needLogs = needLogs;

    if (!config.isLow) {
        const loop = () => {
            setTimeout(loop, config.timer);

            if (store.lastMsg > (Date.now() - (config.timer - 10)) || !store.driver) return;

            store.driver.close();
            store.driver = null;

            if (config.needLogs) console.log("Mailer driver stopped!");
        };

        loop();
    }
};