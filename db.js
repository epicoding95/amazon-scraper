const firebase = require('firebase');
require('firebase/firestore');

//boilerplate for firebase

firebase.initializeApp({
    apiKey: '!!!!!!!!!!!',
    authDomain: '!!!!!!!!!!',
    projectId: '!!!!!!!!!!!!'
});

const db = firebase.firestore();

db.settings({
    timestampsinSnapshots: true
});

module.exports = db;