const localtunnel = require('./localtunnel');
require('dotenv').config()
// Get token from command line arguments
const args = process.argv.slice(2); // Get command line arguments excluding node executable and script name
let token = process.env.TOKEN;
// let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldBVjRwYy1SQW1pV08yN3JDR1liVE1admRKWSJ9.eyJhdWQiOiIzMGU3NGYzMy1mOWIwLTRlMmMtYjk4YS1jNDg0NWY2NTQzYmUiLCJleHAiOjE3MDQ4MTMwNzQsImlhdCI6MTcwNDc3NzA3NCwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiJlNDNiNzA4MS1jMjg0LTQ3Y2YtOWVmMy1kYmQ2NWQ5MTI2YTQiLCJqdGkiOiJmYzBkMTUwMy1hY2Y5LTRhYTgtYmFkMi0wODhjN2VmNDFjZTgiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJQQVNTV09SRCIsImVtYWlsIjoiYW5pbWVzaGQ4MzhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFwcGxpY2F0aW9uSWQiOiIzMGU3NGYzMy1mOWIwLTRlMmMtYjk4YS1jNDg0NWY2NTQzYmUiLCJyb2xlcyI6W10sImF1dGhfdGltZSI6MTcwNDc3NzA3NCwidGlkIjoiOTZmNjUxZDQtNDdiMS1kYTIyLTgyY2UtYzBhODliNWVlMWEwIiwidXNlcklkIjoiNjU0MzRhZGVkMGYyYjUyMWVhNThkNDBkIn0.BoFeHeRwAxc9h2kunumC0wYI8o2MZziQvmE7kmyW4yx7YtFwwX7FPO9GYdgHeGtyWMpGHMEmxAKFsFjRmx0lAuJHKoejZtHL_ncmewQnYiYeQ2ZOHTTCHFEFYr5uUJy_KlS5IZFDKUpNdeuLaB-ryvOfENwckT26P33XCEsIwOq4B3C-Yg_stwMjAT1J-JHfpeYfI5Abq2z7RBTfqHX1tgzDw6ohBu4y5MZ5Kavjk5f2zsK52GPUoLgStNXhxwnZyIStje9V_NnbgobpTKpjhGC36Ju-RXLqVlh1JbcKAdf2n9PlfEpEGtTsEsU67j4C2nuoX-BBrfYozY_AplgFrg'
let port = process.env.PORT;
let name = process.env.NAME;
console.log(name)
// console.log('---port:',port,'---')

args.forEach(arg => {
  if (arg.startsWith('--token=')) {
    token = arg.split('=')[1];
  }
  // if ( arg.startsWith('--port=')) {
  //   port = arg.split('=')[1]
  // }
});
if (!token) {
  console.error('Please provide a valid token using --token={your_token}');
  process.exit(1);
}

(async () => {
  const tunnel = await localtunnel({
    port: port,
    host: 'http://setside.io',
    token: token ,// Set the token obtained from command line argument
    name: name
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
