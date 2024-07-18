const express = require( 'express' )
const app     = express()
const port    = process.env.PORT || 25920
const flag = 'CTF{byl0_t0_t4k_j3dn0duchy}'

app.get( '/' ,(req, res) => {
res.type( 'text/plain' )
res.send( 'Tak jednoduchý to nebude' )
})

app.get( '/home/flag', ( req, res ) => {
    res.type( 'text/plain' )
    res.locals.ua = req.get('User-Agent')
    if (res.locals.ua === 'epicbrowser')
        res.send( flag )
    else
        res.send( 'No flag for you' )
 
})

app.use( ( req, res ) => {
    res.type( 'text/plain' )
    res.status( 404 )
    res.send('404 Not found ☕_☕')
})

app.listen( port ,
    () => console.log(`Expresso ☕ is on Port ${ port } Ctrl + C to Stop `) 
)
