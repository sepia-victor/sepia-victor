const TWILIO_AUTH_TOKEN = require('./keys.js');
const functions = require('firebase-functions');
const admin = require('firebase-admin')
const twilio = require('twilio');
const nodemailer = require('nodemailer')
const gmail = require('./gmailAuth')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

admin.initializeApp()


// nodemailer setup

const mailTransport = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: gmail.email,
    pass: gmail.password
  }
})

const APP_NAME = 'GrabThatSpot'

//[EMAIL EXAMPLE FOLLOW]

//sendWelcomeEmail
exports.sendWelcomeEmail = functions.auth.user().onCreate((user)=>{
  const email = user.email;
  const displayName = user.displayName
  return sendWelcomeEmail(email, displayName)
})

//sendWelcomeEmail(email, displayName)
async function sendWelcomeEmail(email, displayName){
  const mailOptions = {
    from: `${APP_NAME} <noreply@grabthatspot.com>`,
    to: email,
  };

  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you enjoy our service!`;
  await mailTransport.sendMail(mailOptions);
  console.log('New Welcome Email sent to: ', email);
  return null;
}

async function sendWinEmail(email, displayName){
  console.log('email==> ', email)
  console.log('displayName==> ',displayName)
  const mailOptions = {
    from: `${APP_NAME} <noreply@grabthatspot.com>`,
    to: email,
  }

  mailOptions.subject= `You Grabbed that Spot!`;
  mailOptions.text = `Hey ${displayName}! You won the auction you bid on!`
  await mailTransport.sendMail(mailOptions);
  console.log('sent victory email to: ', email);
  return null
}

async function sendHostWinEmail(email, displayName, winnerName){
  const mailOptions ={
    from: `${APP_NAME} <noreply@grabthatspot.com>`,
    to: email
  }
  mailOptions.subject= `Your Spot was Grabbed!`;
  mailOptions.text = `Hey ${displayName}! You auction has ended, and your spot was won by ${winnerName}. You'll receive your payment soon!`
  await mailTransport.sendMail(mailOptions);
  console.log('sent host email to: ', email)
}

//Send Bid Complete emails
exports.auctionEndEmail = functions.firestore.document('auctions/{auctionId}').onUpdate(async (change, context)=>{
  // console.log('UpdateRun', change.after.data())
  let changeId= await change.after.id;
  const bidQuery = await admin.firestore().collection('auctions').doc(changeId).collection('bids').orderBy('offer','desc').limit(1).get()
  let bidList=[]
  const bid = await bidQuery.forEach(bid=>{
    bidList.push(bid.data())
  })
  const highestBid = bidList[0]
  const newState = change.after.data()
  console.log('newState=> ', newState)
  if (!newState.live){
    const winningUser = await admin.auth().getUser(highestBid.userId)
    const hostUser = await admin.auth().getUser(newState.userId)

    sendWinEmail(winningUser.email, winningUser.displayName)
    sendHostWinEmail(hostUser.email, hostUser.displayName, winningUser.displayName)

  }
})

exports.wildCardsTest = functions.firestore.document('auctions/{auctionId}').onWrite((event)=>{
  console.log('Hi! Event: ', event)
})

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
  let currSecs = Date.now() /1000 | 0
  auctions.forEach(async auction=>{
    console.log("I'm still here.")
    let auctionData = await auction.data()
    if (currSecs > auctionData.auctionEndDate.seconds){
      console.log('Auction time vs', currSecs)
      response = await admin.firestore().collection('auctions').doc(auction.id).update({
        live:false
      })
    }else response = {}
  })
  return response;
})


// Configure and set up Twilio instance
const accountSid = 'ACa41998a0d75e32f3d61a8e7d71532b64';
const authToken = TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

const twilioNumber = '+18482462114';

// Start cloud function to send SMS from Twilio
exports.textStatus = functions.database
  .ref('/auctions/{auctionKey}/live')
  .onUpdate(event => {
    const auctionKey = event.params.auctionKey;

    return admin
      .database()
      .ref(`/auctions/${auctionKey}`)
      .once('value')
      .then(snapshot => snapshot.val())
      .then(auction => {
        const live = auction.live;
        const phoneNumber = '+19084337911';

        if (!validE164(phoneNumber)) {
          throw new Error('number must be E164 format!');
        }

        const textMessage = {
          body: `Testing if Auction live status: ${live}`,
          to: phoneNumber, // Text to this number
          from: twilioNumber // From a valid Twilio number
        };

        return client.messages.create(textMessage);
      })
      .then(message => console.log(message.sid, 'success'))
      .catch(err => console.log(err));
  });

/// Validate E164 format
function validE164(num) {
  return /^\+?[1-9]\d{1,14}$/.test(num);
}
