const https = require('https');

module.exports = (req, res) => {
  const params = new URLSearchParams(req.query).toString();
  const url = `https://serpapi.com/search.json?${params}`;

  https.get(url, (apiRes) => {
    let data = '';
    apiRes.on('data', (chunk) => (data += chunk));
    apiRes.on('end', () => {
      res.setHeader('Content-Type', 'application/json');
      res.status(apiRes.statusCode).send(data);
    });
  }).on('error', () => {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  });
};
