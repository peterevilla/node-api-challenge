const app = require('./server.js');


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
});