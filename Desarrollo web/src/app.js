const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const skillsRouter = require('./routes/skills.routes');
const experiencesRouter = require('./routes/experiences.routes');
const educationRouter = require('./routes/education.routes');
const testimonialsRouter = require('./routes/testimonials.routes');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/skills', skillsRouter);
app.use('/experiences', experiencesRouter);
app.use('/education', educationRouter);
app.use('/testimonials', testimonialsRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'ok' });
});

module.exports = app;
