const http = require('http')
const app = require('./app')

const normalizePort = val => {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false
}
const port = normalizePort(process.env.PORT || 3001)
app.set('port', port)

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + 'require Privilege')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' already use')
      process.exit(1)
      break
    default:
      throw error
  }
}

const server = http.createServer(app)
const {
  Server
} = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log(msg)
    socket.broadcast.emit('hi');
    io.emit('chat message', msg);
  });
});
server.on('error', errorHandler)
server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port
  console.log(' ecoute ' + bind)
})

server.listen(port)