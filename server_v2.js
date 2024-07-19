const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');  // Import the CORS package

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
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
