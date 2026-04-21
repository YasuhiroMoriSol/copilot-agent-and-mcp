const express = require('express');

function createBooksRouter({ booksFile, readJSON, writeJSON, authenticateToken }) {
  const router = express.Router();

  router.get('/', (req, res) => {
    let books = readJSON(booksFile);
    const { sortBy, order } = req.query;

    if (sortBy === 'title' || sortBy === 'author') {
      books = books.slice().sort((a, b) => {
        const aVal = (a[sortBy] || '').toLowerCase();
        const bVal = (b[sortBy] || '').toLowerCase();
        const cmp = aVal.localeCompare(bVal);
        return order === 'desc' ? -cmp : cmp;
      });
    }

    res.json(books);
  });

  // POST /books removed: adding books is not allowed

  return router;
}

module.exports = createBooksRouter;
