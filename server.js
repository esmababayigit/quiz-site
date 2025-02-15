const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/quiz', { useNewUrlParser: true, useUnifiedTopology: true });

const scoreSchema = new mongoose.Schema({
    userName: String,
    score: Number
});

const Score = mongoose.model('Score', scoreSchema);

app.post('/api/scores', (req, res) => {
    const newScore = new Score(req.body);
    newScore.save((err, savedScore) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(savedScore);
    });
});

app.get('/api/scores', (req, res) => {
    Score.find({}, (err, scores) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(scores);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});