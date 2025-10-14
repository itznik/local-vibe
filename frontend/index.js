// Import the express library
const express = require('express');

// Create an instance of an express application
const app = express();

// Define the port the server will run on.
// Render provides the PORT environment variable.
const PORT = process.env.PORT || 3001;

// Define a basic route for the root URL
app.get('/', (req, res) => {
  res.send('Hello from the Local Vibe API! The server is running.');
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});
