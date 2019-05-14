const functions = require('firebase-functions');

const admin = require('firebase-admin')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

admin.initializeApp()

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.scheduledFunctionCrontab = functions.pubsub.schedule('0 * * * *').onRun((context) => {
//     console.log('This will be run every day at 1:00 PM UTC!');
// });

// exports.scheduleTest = functions.pubsub.schedule('0 * * * *').onRun((context)=>{
//   console.log('Hi!')

//   return admin.firestore().collection('auctions').doc('ASYmSzFOlg6xhv2HfsMr').update({
//     live: false
//   })
// })

// exports.scheduleTestB = functions.pubsub.schedule('30 * * * *').onRun(async (context)=>{
//   console.log('Bye!')
//   return await admin.firestore().collection('auctions').doc('ASYmSzFOlg6xhv2HfsMr').update({
//     live: true
//   })
// })

//LiveCheck
//Receives: Cron trigger
//Does: Upon triggering, this function will run through every auction and check if the current time is greater than the enddate of the auction. If true, it updates the auction with a false status to live
//Returns: Nothing of note
exports.liveCheck = functions.pubsub.schedule('0 * * * *').onRun(async(context)=>{
  let auctions = await admin.firestore().collection('auctions').get()
  let response = auctions
  auctions.forEach(async auction=>{
    console.log("I'm still here.")
    let auctionData = await auction.data()
    if (Date.now() > auctionData.auctionEndDate.seconds){
      console.log('Auction', auction.data())
      response = await admin.firestore().collection('auctions').doc(auction.id).update({
        live:false
      })
    }else response = {}
  })
  return response;
})

