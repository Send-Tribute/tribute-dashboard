var express = require('express');
var serveStatic = require('serve-static');

var app = express();
app.set('port', 3000);

app.use(express.static('dist'));
app.listen(3001);

// if (process.env.NODE_ENV === 'production') {
//   app.set('port', 4000);
//   app.use(express.static('dist'));
//   app.use('*', express.static('dist'));
// }

app.listen(app.get('port'), () => {
  console.log(
    `_______________________________________________________________`
  );
  console.log(` `);
  console.log(`################# Tribute Frontend Server ####################`);
  console.log(` `);
  console.log(`Started on port ${app.get('port')}`);
  console.log(`______________________________________________________________`);
  console.log(` `);
});
module.exports = { app };
