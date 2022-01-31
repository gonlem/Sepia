const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB);
//mongoose.set('debug', true);

app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', true);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

let appRouter = require('./app-router');
app.use('/sepia-admin', appRouter);

app.get('/', (req, res) => res.redirect('/sepia-admin'));
app.get('/sepia-admin', (req, res) => res.redirect('/sepia-admin/home'));

app.listen(process.env.PORT || '3000');
