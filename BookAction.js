export const fetchBook = bookData => (
    {
      type: 'Fetch_Book',
      payload: bookData,
    }
  );