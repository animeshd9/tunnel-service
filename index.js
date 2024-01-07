const localtunnel = require('../localtunnel');


(async () => {
    const tunnel = await localtunnel({
      port: 8080,
      host: 'https://setside.io',
      subdomain: 'editor',
      
    }).catch(err => {
      throw err;
    });
  
    tunnel.on('error', err => {
      throw err;
    });
  
    console.log('your url is: %s', tunnel.url);
    // console.log(tunnel)
  
    /**
     * `cachedUrl` is set when using a proxy server that support resource caching.
     * This URL generally remains available after the tunnel itself has closed.
     * @see https://github.com/localtunnel/localtunnel/pull/319#discussion_r319846289
     */
    if (tunnel.cachedUrl) {
      console.log('your cachedUrl is: %s', tunnel.cachedUrl);
    }
  
      tunnel.on('request', info => {
        console.log(new Date().toString(), info.method, info.path);
      });
  })();