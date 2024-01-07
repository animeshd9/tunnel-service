const localtunnel = require('../localtunnel');

// Get token from command line arguments
const args = process.argv.slice(2); // Get command line arguments excluding node executable and script name
let token = '';

args.forEach(arg => {
  if (arg.startsWith('--token=')) {
    token = arg.split('=')[1];
  }
});
if (!token) {
  console.error('Please provide a valid token using --token={your_token}');
  process.exit(1);
}

(async () => {
  const tunnel = await localtunnel({
    port: 8080,
    host: 'http://setside.io',
    subdomain: 'editor',
    token: token // Set the token obtained from command line argument
  }).catch(err => {
    console.log(err);
    throw err;
  });

  tunnel.on('error', err => {
    throw err;
  });

  console.log('your url is: %s', tunnel.url);

  if (tunnel.cachedUrl) {
    console.log('your cachedUrl is: %s', tunnel.cachedUrl);
  }

  tunnel.on('request', info => {
    console.log(new Date().toString(), info.method, info.path);
  });
})();
