//Express and Parser Management
var express = require('express');
var app= express();
var handlebars = require('express-handlebars').create({defaultLayout:'default'});
var parser = require('body-parser');

//Express and Parser initialization
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(parser.urlencoded({ extended: false}));
app.use(parser.json());
app.set('port', 3000);