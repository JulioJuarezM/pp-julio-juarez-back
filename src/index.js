const express = require('express'),
      bodyParser = require('body-parser'),
      config = require('./configs/config'),
      app = express(),
      dataHandler = require(`./handlers/DataHandler`),
      tokenHandler= require('./handlers/TokenHandler'),
      jwt = require('jsonwebtoken'),
      routeToken = express.Router()
      ;

app.set('masterKey', config.masterKey);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(3000,()=>{
    console.log('Start listen on port: 3000') 
});

app.post('/auth', (req, res) => {
  const token = tokenHandler.GenerateToken(req,app);
  if(token != 0){
    res.json({
      mensaje: 'Great Auth',
      token: token
    });
  }
  else{
    res.json({
      mensaje: 'Failed Auth'
    })
  }
})

app.post('/allData', routeToken, (req, res) => {
  if(req.body.allData == 1){
    dataHandler.findAllData().then(val => res.json(val));
  }
  else{
    dataHandler.findAByNameAndHobbyData(req).then(val => res.json(val));
  }
 });

 app.post('/insertData', routeToken, (req, res) => {
   res.headers
  dataHandler.insertData(req).then(val => res.json(val));
 });

 app.post('/queryUser', routeToken, (req, res) => {
  dataHandler.findClientSpecified(req).then(val => res.json(val));
 });

 routeToken.use((req, res, next) => {
     const token = req.headers['access-token'];
     if (token) {
       jwt.verify(token, app.get('masterKey'), (err, decoded) => {      
         if (err) {
           return res.json({ mensaje: 'Invalid Token' });    
         } else {
           req.decoded = decoded;    
           next();
         }
       });
     } else {
       res.send({ 
           mensaje: 'Token is not present' 
       });
     }
  });