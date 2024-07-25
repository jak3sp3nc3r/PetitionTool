const axios = require('axios');
require('dotenv').config(); // Ensure dotenv is correctly required

async function makeOpenAIRequest(prompt) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Use the API key from .env
                }
            }
        );

        // Check if choices and message are present
        if (response.data.choices && response.data.choices.length > 0) {
            return response.data.choices[0].message.content;
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Error making OpenAI request:', error.message || error);
        throw error;
    }
}

module.exports = { makeOpenAIRequest };
