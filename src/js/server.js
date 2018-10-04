const express = require('express')
const https = require('https');
const fs = require('fs');
const app = express()
const port = 80

const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: 'badger-218310',
  timestampsInSnapshots: true
});

var fbtext = "No response"

const document = firestore.collection('users').doc('kCnsrFaQlFB8yAvlS5NM');

document.get().then(doc => {
	      if (!doc.exists) {
              fbtext = 'No such document!'
      } else {
              fbtext = doc.data()
      }
});
/*var sslOptions = {
  key: fs.readFileSync('cert/key.pem'),
  cert: fs.readFileSync('cert/cert.pem'),
  passphrase: 'haselko12'
};*/
app.use(express.static('public'))
app.get('/fb', (req, res) => {
    res.send('Hello World! ' + fbtext)
})
//https.createServer(sslOptions, app).listen(443)*/


app.listen(port, () => console.log("Example app listening on port ${port}!"))

