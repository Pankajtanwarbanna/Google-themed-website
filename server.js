var sslRedirect = require('heroku-ssl-redirect');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

// enable ssl redirect
app.use(sslRedirect());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.post('/contactme', function (req,res) {

    // Nodemailer-sandgrid stuff
    var options = {
        auth: {
            api_key: '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'
        }
    };

    var client = nodemailer.createTransport(sgTransport(options));

    var email = {
        from: 'Jagriti Aggarwal, contact@jagriti.com',
        to: '2016ucp1413@mnit.ac.in',
        subject: 'Jagriti, Some one contacted you!',
        text: 'Hello Jagriti, <br>'+ req.body.name + ' ',
        html: 'Hello Jagriti,<br> <strong>'+ req.body.name + '</strong>,contacted you through your website. This guy has an email : '+ req.body.email +'<br><br>This guy sent you a message : '+  req.body.msg +'<br><br>Thank you<br>Jagriti Aggarwal Personal Assitant'
    };

    client.sendMail(email, function(err, info){
        if (err ){
            console.log(err);
        }
        else {
            console.log('Message sent: ' + info.response);
        }
    });

    res.send('Your message has been Successfully sent.')
});

app.get('/', function (req,res) {
    res.sendFile(__dirname + '/public/app/views/index.html');
});

app.get('/about', function (req,res) {
    res.sendFile(__dirname + '/public/app/views/user/about.html');
});

app.get('/contact', function (req,res) {
    res.sendFile(__dirname + '/public/app/views/user/contact.html');
});

app.get('/experience', function (req,res) {
    res.sendFile(__dirname + '/public/app/views/user/experience.html');
});

app.get('/portfolio', function (req,res) {
    res.sendFile(__dirname + '/public/app/views/user/portfolio.html');
});

app.get('/skills', function (req,res) {
    res.sendFile(__dirname + '/public/app/views/user/skills.html');
});

app.get('*', function (req,res) {
    res.sendFile(__dirname + '/public/app/views/user/error.html');
});

app.listen(port, function () {
    console.log('Server running at port 3000');
});