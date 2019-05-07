import fireApp from "../fire";
import firebase from "firebase";

// Get Bids List
// Recieves: AuctionId
// Does: Finds the Auction with the given AuctionId, and returns all elements of the Bids collection associated with that Auction
// Returns: List of all Bids associated with Auction
const getBidsData = async (auctionId) =>{
  let bidsQuery = fireApp.firestore().collection("auctions").doc(auctionId)
  try{
    let bidsArray = []
    let bidsGet = await bidsQuery.collection("bids").get()
    await bidsGet.forEach(async bid=>{
      await bidsArray.push(bid.data())
    })
    return await bidsArray
  }catch(error){
    console.error(error)
  }
}


// Get Single Bid
// Receive AuctionId, UserId
// Does: Finds the Auction with the given AuctionId, and returns the latest Bid made by the given UserId
// Returns: A Single Bid Object

// Make Bid
// Receives: AuctionId, UserId, UserBid
// Does: Creates a new document entry into the bids collection of the auction with the give AuctionId. New Document will contain UserId and UserBid
// Returns: A Single Bid Object
const addBidData = async (auctionId, userId, userBid) =>{
  let bidsQuery = fireApp.firestore().collection("auctions").doc(auctionId)
  try {
    let bidObj = {
      userId: userId,
      offer: userBid
    }
    let bidAdd = await bidsQuery.collection("bids").add(bidObj)
    return await bidAdd
  } catch (error) {
    console.error(error)
  }
}

// Get Highest Bid
// Receives: AuctionId
// Does: Makes a query to the firestore data and receives the highest bid made so far
// Returns: Bid
const highestBidData = async (auctionId) =>{
  let bidsQuery = fireApp.firestore().collection("auctions").doc(auctionId)
  try {
    let bidArr = []
    let highBid = await bidsQuery.collection("bids").orderBy('offer', 'desc').limit(1).get()
    highBid.forEach(bid=>{
      bidArr.push(bid.data())
    })
    return bidArr[0]
  } catch (error) {
    console.error(error)
  }
}


export {
  getBidsData,
  addBidData,
  highestBidData
}
