import fireApp from "../fire";
import firebase from "firebase";
import fire from "../fire";

// Add Auction
// Receive: Auction Data {Location: Geolocation, UserId, etc}
// minBid, buyNowBid, availability start/end timestamps, start/end dates
// Does: Adds a new Auction to the collection Auctions mapping the given data to the key value stores to the user specific auction
// Return: Success/Fail log
const addAuction = async (newAuctionData) => {
  let addAuctionQuery = fireApp.firestore().collection("auctions");
  try {
    let newAuction = null

    newAuction = await addAuctionQuery.add({
      // availableStartDate: new firebase.firestore.Timestamp(0,0),
      // availableEndDate: new firebase.firestore.Timestamp(0, 0),
      availableStartDate: newAuctionData.availableStartDate,
      availableEndDate: newAuctionData.availableEndDate,
      auctionStartDate: newAuctionData.auctionStartDate,
      auctionEndDate: newAuctionData.auctionEndDate,
      minimumBid: newAuctionData.minimumBid,
      userId: newAuctionData.userId,
      location: {
        address: newAuctionData.streetAddress,
        city: newAuctionData.city,
        state: newAuctionData.state,
        // geoPosition: new firebase.firestore.GeoPoint( 1.345 , 3.456 ),
        geoPosition: newAuctionData.geoPoint,
      },
      live: true
    });

    console.log( 'doc written' , newAuction);
  } catch (error) {
    console.log(error);
  }
};

// Remove Auction
// Receive: AuctionID and UserId
// Does: First checks that the given UserId matches the UserId on the document with the given AuctionID. If this check passes, locks the Auction and freezes the bids. The Live switch is false
// Return: Success/Fail log, Redirect to AuctionList

// Update Auction
// Receive: AuctionId, UserId, Auction Data {stuff}
// Does: Checks userId against UserId of Document with AuctionId
// Return: Success/Fail log, Redirect to AuctionList

// Get Auctions
// Receives: Nothing
// Does: Gets all the auctions currently available from the Firestore database where the action's Live boolean is true
// Returns: An array of objects containing the Id of an Auction and the data of said auction
const getAuctionsData = async () => {
  let auctionsQuery = fireApp.firestore().collection("auctions").where('live','==',true);
  try {
    let auctionsArray = [];
    let snapshot = await auctionsQuery.get();
    await snapshot.forEach(async doc => {
      let data = await doc.data();
      data.id = doc.id;
      auctionsArray.push(data)
    });
    return await auctionsArray;
  } catch (error) {
    console.log(error);
  }
};

// Get Single Auction
// Receives: AuctionId
// Does: Pulls the Auction Data from the document with given AuctionId
// Returns: Auction
const getSingleAuctionData = async(auctionId)=>{
  let auctionsQuery = fireApp.firestore().collection("auctions");
  try{
    let auctionDoc = await auctionsQuery.doc(auctionId).get()
    return auctionDoc.data()
  }catch(err0r){
    console.error(err0r)
  }
}

// Get Auction's Bids

// Get Auction's TOP bid

// Close Auction
// Receives: AuctionId
// Does: Lock the auction, change the Auction's Live boolean to false, Auction will no longer be able to receive bids.
// Returns: Success/Fail Log

// Cancel Auction
// Receives: AuctionId, UserId
// Does: If userId checks out, {Close Auction} and inform bidders
// Returns: Success/Fail Log, list of Bidders

// Finalize Auction
// Receives: AuctionId
// Does: Function will only only be called on a TimeOut. On TimeOut, {Close Auction} and send bidder to Host and Bidder
// Return: Success/Fail log, Winning Bid

// Get Max Bid
// Receives: AuctionId,
// Does: Checks all bids in the bid collection and returns the info for the highest bid.
// Return: Bid

// Get Locations
// Receive: UserGeoLocation, List of Auctions, Radius
// Does: Check all the Auctions in the list of auctions for auctions that that are within the radius of the UserGeoLocation
// Return: List of Auctions close to UserGeoLocation

export { getAuctionsData , addAuction, getSingleAuctionData };
