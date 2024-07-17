const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Use Heroku's dynamic port or default to 3000

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory (if you have one)
// Adjust the path according to your project structure
app.use(express.static(path.join(__dirname, 'public')));

// Serve petition form on the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'petition_form_v2.html')); // Replace with your HTML file path
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { firstName, lastName, city, state, keywords } = req.body;

  // Generate AI response based on inputs
  const aiResponse = `My name is ${firstName} ${lastName} from ${city}, ${state}. I support this petition because ${keywords}.`;

  // Respond with AI-generated message
  res.send(aiResponse);
});

// Handle 404 errors
app.use((req, res, next) => {
  // Customize the 404 error response
  res.status(404).send("Sorry, the page you are looking for does not exist.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
