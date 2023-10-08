const axios = require('axios'); // Import the Axios library
let config;
if(process.env.NODE_ENV === 'production') {
  // We are running in production mode
  config = require('./config/prod.json');

} else {
 // We are running in development mode
  config = require('./config/stage.json');
}
exports.searchBooks = (searchTerm) => {
  // Your Google Books API key (replace with your own)
  const googleBooksApiKey = config.googleBooksApiKey;

  // URL for the Google Books API
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    searchTerm
  )}&key=${googleBooksApiKey}`;

  // Send a GET request to the API using Axios
  axios
    .get(apiUrl)
    .then((response) => {
      // Handle the JSON response data
      const books = response.data.items || [];

      if (books.length === 0) {
        console.log('No books found for the given search term.');
      } else {
        console.log('Books found:');
        books.forEach((book) => {
          console.log(`Title: ${book.volumeInfo.title}`);
          console.log(`Authors: ${book.volumeInfo.authors.join(', ')}`);
          console.log(`Description: ${book.volumeInfo.description}`);
          console.log('---');
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}