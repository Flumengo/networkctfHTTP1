const express = require( 'express' )
const crypto = require('crypto');
const fs = require('fs');

const app     = express()
const port    =  25920
const flag = 'CTF{byl0_t0_t4k_j3dn0duchy}'

app.get( '/' ,(req, res) => {
res.type( 'text/plain' )
res.send( 'Tak jednoduchý to nebude' )
})

app.get( '/home/flag', ( req, res ) => {
    res.type( 'text/plain' )
    res.locals.ua = req.get('User-Agent')

    if (res.locals.ua === 'epicbrowser' && req.get('key') === 'supertanjnejkliicbabbyyy')
        res.send( flag )
    else
        res.send( 'No flag for you' )
 
})

app.use( ( req, res ) => {
    res.type( 'text/plain' )
    res.status( 404 )
    res.send('404 Not found ☕_☕')
})


//
// HAXASÍNO 1
//


// File path for storing player data
const dataFilePath = 'players.json';

// Load player data from JSON file
function loadPlayerData() {
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
  }
  return {};
}

// Save player data to JSON file
function savePlayerData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Store player data in memory
let players = loadPlayerData();

// Generate a random token and seed
app.get('/generate_token', (req, res) => {
  let token = crypto.randomBytes(16).toString('hex');
  let seed = Math.floor(new Date().getTime() / 1000); // Unix Time Stamp
  players[token] = { balance: 100, seed: seed };
  savePlayerData(players);
  res.send(`Welcome to Kaktusíno 1! Your authentication token is: ${token}\nYour balance is: $100\n`);
});

// Spin action
app.get('/spin', (req, res) => {
  const token = req.headers['token'];
  const bet = parseFloat(req.headers['bet']);

  if (!token || !bet || isNaN(bet)) {
    return res.status(400).json({ error: 'Invalid token or bet amount' });
  }

  if (!players[token]) {
    return res.status(400).json({ error: 'Invalid token' });
  }

  if (bet > players[token].balance) {
    return res.status(400).json({ error: 'Insufficient funds' });
  }

  // Simulate the spin
  if (win) {
    players.balance += bet;
  } else {
    player.balance -= bet;
  }

  savePlayerData(players);

  if (players[token].balance >= 1000000) {
    return res.json({ result: 'win', balance: players[token].balance, flag: 'CTF{k4s1n0_j3_ch4r1t4}' });
  }

  res.json({ result: win ? 'win' : 'lose', balance: players[token].balance });
});

app.listen( port ,
  () => console.log(`Expresso ☕ is on Port ${ port } Ctrl + C to Stop `) 
)




