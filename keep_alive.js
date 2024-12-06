// In keep_alive.js
import http from 'http';

export function keepAlive() {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Keep Alive');
  });

  server.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}
