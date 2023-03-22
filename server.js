require('dotenv').config();
require('./server/db-conn')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// gives server access to static files generated by running yarn build in client
app.use(express.static('./client/mern_azure_example/build/'));

// mount routes
app.use('/api/thoughts/', require('./server/routes/thought-routes'));

// the asterisk is very important!! as it allows client side routing
// with react-router or w/e client side routing package you use
app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/client/mern_azure_example/build/' });
  });

const {PORT} = process.env;
app.listen(PORT, ()=>{
    console.log(`Server is listening on port = ${PORT}`);
})
