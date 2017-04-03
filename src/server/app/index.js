const app = require('./app');

const PORT = process.env.PORT || 3001;

// Why don't I need http createServer
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`); // eslint-disable-line no-console
});

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'? 'Pipe ' + port : 'Port ' + port; //eslint-disable-line

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`); // eslint-disable-line no-console
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`); // eslint-disable-line no-console
      process.exit(1);
      break;
    default:
      throw error;
  }
}

app.on('error', onError);
