import React, { Component } from "react";
import { Flex, Box, FormField, Input, Icon, Text } from "pcln-design-system";
import { highestBidData } from "../../scripts/Bids.Data";
import { getSingleAuctionData } from "../../scripts/Auctions.Data";
import fireApp from "../../fire";
import moment from "moment";
import countdown from "countdown";
import ReactMomentCountdown from "react-moment-countdown";
require("moment-countdown");

moment().format();
// console.log( 'moment-->' , moment().format("YYYY") );

class AddBid extends Component {
  constructor(props) {
    super(props);
    this.ref = fireApp
      .firestore()
      .collection("auctions")
      .doc(this.props.auctionId)
      .collection("bids")
      .orderBy("offer", "desc");
    this.unsubscribe = null;
    this.state = {
      auction: {},
      user: "",
      userBid: 0,
      highestCurrBid: {},
      unsub: {},
      timeleft: 0
    };
  }

  // ComponentDidMount will get current highest bid in the specific auction
  // Does: Uses AddUserBid function and this.state.props.auctionId(?) to populate this.state.highestCurrBid.
  //Does: Populates this.state.auction with GetSingleAuction from Auction.Data.js
  //Does: Confirm user is authorized to be on this page
  async componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    console.log(this.unsubscribe);
    this.setState({
      auction: await getSingleAuctionData(this.props.auctionId)
    });
    console.log(this.state);
  }

  onCollectionUpdate = snapshot => {
    console.log("onCollectionUpdate");
    const highestCurrArr = [];
    snapshot.forEach((doc, i) => {
      highestCurrArr.push(doc.data());
      console.log("current arr", highestCurrArr);
    });

    this.setState({
      highestCurrBid: highestCurrArr[0]
    });
  };

  //Detach Listeners
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Flex alignItems="center" flexDirection="column">
        <Box width={1 / 2} p={2} m={2} bg="lightBlue">
          {this.state.auction.auctionEndDate && (
            <Text color="text">
              <ReactMomentCountdown
                toDate={moment.unix(this.state.auction.auctionEndDate.seconds)}
              />
            </Text>
          )}
          {this.state.highestCurrBid ? (
            <Text color="text">{this.state.highestCurrBid.offer}</Text>
          ) : (
            <Text color="text">{this.state.auction.minimumBid}</Text>
          )}
        </Box>
        <Box width={1 / 2} p={2} m={2} bg="lightGreen">
          <FormField>
            <Icon name="DollarCircle" color="text" size="20" />
            <Input
              id="offer"
              name="offer"
              color="text"
              fontSize={1}
              placeholder="Place Your Bid Here"
            />
          </FormField>
        </Box>
      </Flex>
    );
  }
}

export default AddBid;
