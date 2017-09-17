'use strict';

const express = require('express');

const app = express();

// Google Cloud Services
const keyFilename="./geo-vune-firebase-adminsdk-2avs2-8a70f70b85.json"; //replace this with api key file
const projectId = "geo-vune" //replace with your project id
const bucketName = `${projectId}.appspot.com`;
const mime = require('mime-types');

const gcs = require('@google-cloud/storage')({
     projectId,
     keyFilename
});

const bucket = gcs.bucket(bucketName);

// Firebase
/*var firebase = require('firebase');
firebase.initializeApp({
    apiKey: "AIzaSyB894prbl5dG99bPeFBWPA8tVrRjM0SZHg",
    authDomain: "geo-vune.firebaseapp.com",
    databaseURL: "https://geo-vune.firebaseio.com",
    projectId: "geo-vune",
    storageBucket: "geo-vune.appspot.com",
    messagingSenderId: "170143223481"
});*/

const filePath = `./package.json`;
const uploadTo = `videos/`;
const fileMime = mime.lookup(filePath);

app.get('/', (req, res) => {
	res.status(200).send('Planet Vune API Demo');
});

function createPublicFileURL(storageName) {
     return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(storageName)}`;
}

app.get('/retrieveVideoURL', (req, res) => {
 	console.log(`Retrieving video URL from Firebase`);

});

app.post('/postVideo', (req, res) => {
 	console.log(`Retrieving video URL from Firebase`);
 	// to change in request body
	bucket.upload(req.filepath,{
		  destination:uploadTo,
		  public:true,
		  metadata: {contentType: fileMime,cacheControl: "public, max-age=300"}

		}, function(err, file) {
		  	if(err)
		    {
		        console.log(err);
		        return;
		    }
		    console.log(createPublicFileURL(uploadTo));
	});
});

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8081, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
