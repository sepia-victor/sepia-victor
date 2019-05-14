const TWILIO_AUTH_TOKEN = require('./keys.js');

const functions = require('firebase-functions');
const twilio = require('twilio');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

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
