const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'petition_form_v2.html')); 
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
  res.sendFile(path.join(__dirname, 'thank_you.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
