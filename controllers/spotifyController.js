const cookieParser = require('cookie-parser');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const history = require('connect-history-api-fallback');
const cors = require('cors');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
REDIRECT_URI = 'http://localhost:3001/api/spotify/callback'
FRONTEND_URI =  'http://localhost:3000'

let express = require('express')
let request = require('request')
let querystring = require('querystring')

let router = express()

const generateRandomString = length => {
 let text = '';
 const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 for (let i = 0; i < length; i++) {
   text += possible.charAt(Math.floor(Math.random() * possible.length));
 }
 return text;
};

const stateKey = 'spotify_auth_state';


router.use(express.static(path.resolve(__dirname, '../client/build')));

router
  .use(express.static(path.resolve(__dirname, '../client/build')))
  .use(cors())
  .use(cookieParser())
  .use(
    history({
      verbose: true,
      rewrites: [
        { from: /\/login/, to: '/login' },
        { from: /\/callback/, to: '/callback' },
        { from: /\/refresh_token/, to: '/refresh_token' },
      ],
    }),
  )
  .use(express.static(path.resolve(__dirname, '../client/build')));

router.get('/', function (req, res) {
  res.render(path.resolve(__dirname, '../client/build/index.html'));
});

router.get('/login', function (req, res) {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope =
    'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';

  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state,
    })}`,
  );
});

router.get('/callback', function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
          'base64',
        )}`,
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        res.redirect(
          `${FRONTEND_URI}/#${querystring.stringify({
            access_token,
            refresh_token,
          })}`,
        );
      } else {
        res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
      }
    });
  }
});




router.get('/refresh_token', function (req, res) {
 
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
        'base64',
      )}`,
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({ access_token });
    }
  });
});





module.exports = router;








// let redirect_uri = 
//   process.env.REDIRECT_URI || 
//   'http://localhost:3001/api/spotify/callback'

// router.get('/login', function(req, res) {
//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: process.env.SPOTIFY_CLIENT_ID,
//       scope: 'user-read-private user-read-email user-read-recently-played playlist-modify-public playlist-modify-private user-read-currently-playing user-modify-playback-state',
//       redirect_uri
//     }))
// })

// router.get('/callback', function(req, res) {
//   let code = req.query.code || null
//   let authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     form: {
//       code: code,
//       redirect_uri,
//       grant_type: 'authorization_code'
//     },
//     headers: {
//       'Authorization': 'Basic ' + (Buffer.from(
//         process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
//       ).toString('base64'))
//     },
//     json: true
//   }
//   request.post(authOptions, function(error, response, body) {
//     var access_token = body.access_token
//     let uri = process.env.FRONTEND_URI || 'http://localhost:3000/profile'
//     res.redirect(uri + '?access_token=' + access_token)
//   })
// })

module.exports = router;
