import React, { Component } from "react";
import { error } from "util";

import fireApp from "../../fire";
import {
  Card,
  Heading,
  Icon,
  Box,
  Text,
  Flex,
  Button
} from "pcln-design-system";

import firebase from "firebase";

import { Link } from "react-router-dom";

import {
  getAuctionsData,
  addAuction,
  getSingleAuctionData
} from "../../scripts/Auctions.Data";
import {
  getBidsData,
  addBidData,
  highestBidData
} from "../../scripts/Bids.Data";

export default class AuctionList extends Component {
  constructor() {
    super();
    this.state = {
      name: "Foo",
      auctions: [],
      singleAuction: {},
      style: {
        width: 350
      }
    };
    this.handleSeeDetails = this.handleSeeDetails.bind(this);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  async componentDidMount() {
    let holdArr = [1, 3, 4];
    let auctionsQuery = fireApp.firestore().collection("auctions");

    this.setState({
      // name: 'Bar',
      // auctions: await this.getDataArray()
      auctions: await getAuctionsData()
    });
    console.log("-->   ", this.state);

    // await addAuction();
    // let bidData= await getBidsData('H8ud54fFftYOdZWdgD2v')
    // let addBid = await addBidData('H8ud54fFftYOdZWdgD2v', 'INAh1ztLO8Y2gpw99MNv0TM2BRV2', 40)
    // let highBid = await highestBidData('H8ud54fFftYOdZWdgD2v')
    let testAuction = await getSingleAuctionData("H8ud54fFftYOdZWdgD2v");
    console.log(testAuction);

    // await auctionsQuery.get().then(async snapshot => await snapshot.forEach(doc=> holdArr.push(doc.data()))).then( console.log(holdArr)).catch(err=>console.error(err));

    this.unregisterAuthObserver = fireApp.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });

    document.addEventListener("click", this.closeNav);
  }

  handleSeeDetails(singleAuction) {
    console.log("parameter--->   ", singleAuction);
    this.setState({
      singleAuction
    });
    this.openNav();
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.closeNav);
  }
  openNav() {
    const style = { width: 350 };
    this.setState({ style });
    document.body.style.backgroundColor = "rgba(0,0,255)";
    document.addEventListener("click", this.closeNav);
  }

  closeNav() {
    document.removeEventListener("click", this.closeNav);
    const style = { width: 0 };
    this.setState({ style });
    document.body.style.backgroundColor = "#F3F3F3";
  }

  render() {
    return (
      <div>
        <Heading m={3}>Auctions</Heading>
        <hr />
        <Flex wrap>
          {this.state.auctions.map(auction => (
            <Box key={auction.id} p={3} width={[1 / 2, 1 / 3, 1 / 4]}>
              {/* <Text.span px={2}>{auction.id}</Text.span> */}
              <Text px={2}>
                <Icon name="CarCircle" color="black" />
                {auction.location.city}, {auction.location.state}
              </Text>
              <Text px={2}>Minimum Bid: ${auction.minimumBid}</Text>
              <Text px={2}>Grab Now Bid: ${auction.buyNowBid}</Text>
              <Button
                size="small"
                onClick={e => this.handleSeeDetails(auction)}
              >
                See Details
              </Button>
            </Box>
          ))}
        </Flex>

        <div>
          {this.state.singleAuction.id && (
            <div ref="snav" className="overlay" style={this.state.style}>
              <div className="sidenav-container">
                </div>
                <div className="text-center">
                <a
                  href="javascript:void(0)"
                  className="closebtn"
                  onClick={this.closeNav}
                >
                  X
                </a>
                  {this.state.singleAuction.id && (
                    <Box key={this.state.singleAuction.id} p={3}>
                      <Text px={2}>
                        {this.state.singleAuction.location.city},{" "}
                        {this.state.singleAuction.location.state}
                      </Text>
                    </Box>
                  )}{" "}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
