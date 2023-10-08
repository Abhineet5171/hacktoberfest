const axios = require('axios'); // Import the Axios library

function searchBooks(searchTerm) {
  // Your Google Books API key (replace with your own)
  const apiKey = 'YOUR_API_KEY';

  // URL for the Google Books API
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    searchTerm
  )}&key=${apiKey}`;

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