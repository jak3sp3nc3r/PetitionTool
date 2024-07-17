const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve the petition form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/petition_form_v2.html');
});

// Route to handle form submission
app.post('/submit-petition', (req, res) => {
    // Process form data here
    const { firstName, lastName, city, state, callToAction, keywords, aiResponse } = req.body;

    // Save data to a file (example: petition_data.csv)
    const data = `${firstName},${lastName},${city},${state},${callToAction},${keywords},${aiResponse}\n`;
    fs.appendFileSync('petition_data.csv', data);

    // Render thank you page
    res.sendFile(__dirname + '/thank_you.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
