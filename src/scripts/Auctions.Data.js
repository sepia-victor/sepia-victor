// Add Auction
// Receive: Auction Data {Location: Geolocation, UserId, etc}
// Does: Adds a new Auction to the collection Auctions mapping the given data to the key value stores to the user specific auction
// Return: Success/Fail log

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
// Returns: An array containing all LIVE actions

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
