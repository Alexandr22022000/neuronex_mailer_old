const {setConfig, sendMsg} = require('./index');

setConfig({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: '',
        pass: '',
    },
});

sendMsg({
    from: 'EasyHotel <easyhotels24@gmail.com>',
    to: "zol22222@mail.ru",
    subject: "TEST",
    html: "<h1>Test Msg!</h1>",
});