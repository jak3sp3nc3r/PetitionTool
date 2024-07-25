require('dotenv').config(); // Ensure dotenv is correctly required
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'petition_form_v2.html'));
});

app.get('/thank_you', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'thank_you.html'));
});

app.post('/api/generate-response', async (req, res) => {
    const { firstName, lastName, city, state, keywords, callToAction } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: `Generate a unique message of support for the petition based on the following details:\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nCity: ${city}\nState: ${state}\nKeywords: ${keywords}\nCall to Action: ${callToAction}\n\nMessage:`,
            max_tokens: 150,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const aiResponse = response.data.choices[0].text.trim();
        res.json({ aiResponse });
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({ aiResponse: 'Error generating response' });
    }
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.resolve(__dirname, 'public', '404.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
