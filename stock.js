document.addEventListener('DOMContentLoaded', () => {
  const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1GmPqpqeJwtefR3tM2hndAI5meeDVRjDljqanIFwGno_VogkYgi-6x1dAVErf_i7QjRP0IfB9c_fF/pub?gid=0&single=true&output=csv';

  fetch(csvUrl)
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\n').slice(1); // Skip header row
      const stock = {};

      rows.forEach(row => {
        const [color, size, quantity] = row.split(',');
        const key = `${color.toLowerCase()}-${size.toUpperCase()}`;
        stock[key] = parseInt(quantity, 10);
      });

      // Update buttons based on stock
      document.querySelectorAll('.btn-stock').forEach(button => {
        const key = button.dataset.key;
        if (stock[key] === 0) {
          button.classList.add('agotado');
        }
      });

      // Update product cards based on stock
      document.querySelectorAll('.product-card').forEach(card => {
        const key = card.dataset.key;
        const sizes = ['S', 'M', 'L'];
        const outOfStock = sizes.every(size => stock[`${key}-${size}`] === 0);
        if (outOfStock) {
          card.classList.add('agotado');
        }
      });
    })
    .catch(error => console.error('Error fetching stock data:', error));
});
