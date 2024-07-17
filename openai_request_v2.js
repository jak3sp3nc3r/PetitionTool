const axios = require('axios');

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
                    'Authorization': 'Bearer sk-proj-uTSFqJ4z03SWNPlyKGEQT3BlbkFJ16jZmMFaDxfv6crSS0Ug'
                }
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error making OpenAI request:', error);
        throw error;
    }
}

module.exports = { makeOpenAIRequest };
