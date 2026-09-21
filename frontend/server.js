// Hostinger's Node app hosting needs a JS entry file to run (not an npm CLI command),
// so this replaces `serve -s build` with the equivalent using serve-handler directly.
const http = require('http');
const path = require('path');
const handler = require('serve-handler');

const server = http.createServer((req, res) => {
  return handler(req, res, {
    public: path.join(__dirname, 'build'),
    rewrites: [{ source: '**', destination: '/index.html' }],
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Serving build/ on port ${port}`));
