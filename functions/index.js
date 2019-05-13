const functions = require('firebase-functions');

const admin = require('firebase-admin')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

admin.initializeApp()

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.scheduledFunctionCrontab = functions.pubsub.schedule('0 * * * *').onRun((context) => {
    console.log('This will be run every day at 1:00 PM UTC!');
});

exports.scheduleTest = functions.pubsub.schedule('0 * * * *').onRun((context)=>{
  console.log('Hi!')

  return admin.firestore().collection('auctions').doc('ASYmSzFOlg6xhv2HfsMr').update({
    live: false
  })
})

exports.scheduleTestB = functions.pubsub.schedule('30 * * * *').onRun(async (context)=>{
  console.log('Bye!')
  return await admin.firestore().collection('auctions').doc('ASYmSzFOlg6xhv2HfsMr').update({
    live: true
  })
})

exports.scheduleTestC = functions.pubsub.schedule('0 * * * *').onRun(async(context)=>{
  let auctions = await admin.firestore().collection('auctions').get()
  let response = auctions
  auctions.forEach(async auction=>{
    console.log("I'm still here.")
    if (Date.now() > auction.data().auctionEndDate.seconds){
      console.log('Date Now', Date.now())
      response = await admin.firestore().collection('auctions').doc(auction.id).update({
        live:false
      })
    }else response = {}
  })
  return response;
})

