import React, { Component } from "react";
import { error } from "util";

import fireApp from "../../fire";
import { Card, Heading, Icon, Box, Text, Flex } from "pcln-design-system";

import firebase from "firebase";

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

import AuctionPage from "./AuctionPage";

export default class AuctionList extends Component {
  constructor() {
    super();
    this.state = {
      name: "Foo",
      auctions: []
    };
  }

  //DateConversion
  //Receives: a date
  // Does: converts date to seconds
  // Return: Seconds integer

  // async getDataArray(){
  //   let auctionsQuery = fireApp.firestore().collection("auctions");
  //   try {
  //       let holdArr = []
  //       let snapshot = await auctionsQuery.get();
  //       await snapshot.forEach(async doc => {
  //         await holdArr.push(doc.data());
  //       });
  //       return await holdArr
  //     } catch (error) {
  //       console.error(error);
  //     }
  // }

  async componentDidUpdate() {
    // console.log(this.getDataArray())
    // this.setState({
    //   name: 'Bar',
    //   auctions: await this.getDataArray()
    // });
  }

  async componentDidMount() {
    let holdArr = [1, 3, 4];
    let auctionsQuery = fireApp.firestore().collection("auctions");
    // auctionsQuery.get().then(snapshot => { snapshot.forEach(doc => console.log(doc.data()))});
    // try {
    //   let snapshot = auctionsQuery.get
    // } catch (error) {
    //   console.error(error)
    // }
    // try {
    //   let snapshot = await auctionsQuery.get();
    //   snapshot.forEach(doc => {
    //     holdArr.push(doc.data());
    //   });
    //   console.log("---->", holdArr);

    // } catch (error) {
    //   console.error(error);
    // }

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
            </Box>
          ))}
        </Flex>
      </div>
    );
  }
}

{
  /* <Box p={1} bg="lightBlue" key={auction.id}>
          </Box> */
}
