import http from 'http';

export function keepAlive() {
  const port = process.env.PORT || 8080;  // Render assigns a port dynamically, fallback to 8080 locally
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Keep Alive');
  });

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
