import React, { Component } from "react";
import {
  Flex,
  Box,
  FormField,
  Input,
  Icon,
  Text,
  Tooltip,
  RedButton
} from "pcln-design-system";
import { highestBidData, addBidData } from "../../scripts/Bids.Data";
import { getSingleAuctionData } from "../../scripts/Auctions.Data";
import fireApp from "../../fire";
import moment from "moment";
import countdown from "countdown";
import ReactMomentCountdown from "react-moment-countdown";
import { tsTypeQuery } from "@babel/types";
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
      timeleft: 0,
      bidFlag: true,
      errorFlag: false,
      errorMessage: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  //Handle Change
  //Receives: event
  //Does: Checks given event, and sets the UserBid based upon that event. If the event is invalid, inform user.
  //Return: setState {userbid}
  handleChange(event) {
    let minBid = this.state.highestCurrBid
      ? this.state.highestCurrBid.offer
      : this.state.auction.minimumBid;
    event.preventDefault();
    console.log(event.target.value);
    if (Number(event.target.value) <= minBid) {
      this.setState({
        bidFlag: true
      });
    } else {
      this.setState({
        userBid: Number(event.target.value),
        bidFlag: false
      });
    }
  }

  //Handle Submit
  //Receives: event
  //Does: Prevent event's default function, submits the userId, the auctionId, and this state's userBid
  //Return: Submits Document to Firestore, Succcess/Failure
  async handleSubmit(event) {
    let minBid = this.state.highestCurrBid
      ? this.state.highestCurrBid.offer
      : this.state.auction.minimumBid;
    event.preventDefault();
    console.log("handling the submit");
    console.log("google currentUser ", fireApp.auth().currentUser.uid);
    if (fireApp.auth().currentUser) {
      let auctionId = this.props.auctionId;
      let userId = fireApp.auth().currentUser.uid;
      let userBid = this.state.userBid;
      try {
        if (userBid > minBid) {
          let success = await addBidData(auctionId, userId, userBid);
          console.log(success);
        } else {
          this.setState({
            message: "Needs a higher bid.",
            errorFlag: true
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    let minBid = this.state.highestCurrBid
      ? this.state.highestCurrBid.offer
      : this.state.auction.minimumBid;

    return (
      <Box>
        {this.state.auction.auctionEndDate && (
          <Text px={2} color="text">
            <ReactMomentCountdown
              toDate={moment.unix(this.state.auction.auctionEndDate.seconds)}
            />
          </Text>
        )}
        {this.state.highestCurrBid ? (
          <Text px={2} color="text">
            {this.state.highestCurrBid.offer}
          </Text>
        ) : (
          <Text px={2} color="text">
            {this.state.auction.minimumBid}
          </Text>
        )}
        <FormField>
          <Icon name="DollarCircle" color="text" size="20" />
          <Input
            p={2}
            id="offer"
            name="offer"
            placeholder="Place Your Bid Here"
            onChange={this.handleChange}
            type="number"
            defaultValue={minBid}
            size="20"
          />
        </FormField>
        {this.state.bidFlag ? (
          <Tooltip bottom right color="white" bg="red">
            There is a higher bid.
          </Tooltip>
        ) : null}
        <RedButton size="medium" m={3} onClick={this.handleSubmit}>
          Submit
        </RedButton>
      </Box>
    );
  }
}

export default AddBid;
