require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');  // Import the CORS package
const axios = require('axios');  // Import Axios for API requests

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());  // Use the CORS middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'petition_form_v2.html')); 
});

app.get('/thank_you', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'thank_you.html'));
});

app.get('/test-env', (req, res) => {
  res.send(`OpenAI API Key: ${process.env.OPENAI_API_KEY}`);
});

// Handle form submission
app.post('/api/generate-response', async (req, res) => {
  const { firstName, lastName, city, state, keywords, callToAction } = req.body;

  try {
    // Generate AI response based on inputs using OpenAI API
    const apiKey = process.env.OPENAI_API_KEY;
    const prompt = `Generate a unique and creative message of support for the petition. Incorporate the following details into a meaningful and original response:\n\nName: ${firstName} ${lastName}\nCity: ${city}\nState: ${state}\nKeywords: ${keywords}\nCall to Action: ${callToAction}\n\nHere is the petition text for context: Fact: A recent ban on mall cops has threatened the safety and security of our shopping centers. We propose a new bill to overturn this ban and restore peace of mind to shoppers. Sign below to support!`;

    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const aiResponse = response.data.choices[0].text.trim();  // Extract and trim the response text

    // Respond with AI-generated message
    res.send({ aiResponse });
  } catch (error) {
    console.error('Error generating AI response:', error.response ? error.response.data : error.message);
    res.status(500).send('An error occurred while generating the response.');
  }
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
