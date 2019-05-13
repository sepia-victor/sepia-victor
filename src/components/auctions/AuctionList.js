import React, { Component } from "react";
// import { error } from "util";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import googleConfig from "../../keys.js";
// import CurrentLocation from "../maps/Map";
import AddBid from "../bids/AddBid";
import moment from "moment";
import fireApp from "../../fire";
import styled from "styled-components";
import {
  Card,
  Heading,
  Icon,
  Box,
  Text,
  Flex,
  Button,
  OutlineButton,
  Container,
  Flag,
  Banner,
  Divider
} from "pcln-design-system";

// import firebase from "firebase";

import { Link } from "react-router-dom";

import {
  getAuctionsData,
  addAuction,
  getSingleAuctionData
} from "../../scripts/Auctions.Data";

// import {
//   getBidsData,
//   addBidData,
//   highestBidData
// } from "../../scripts/Bids.Data";

// const vertAlign = {
//   verticalAlign: "middle"
// };

const OverLayContainer = styled(Container)`
  /* height: 0%; */
  /* width: 0%; */
  position: fixed;
  z-index: 5;
  top: 20%;
  /* margin: 0 auto; */
  /* background-color:rgb(0,0,255); */
  /* background-color: rgba(128, 128, 128,.75); */
  transition: 0.5s;
`;

class AuctionList extends Component {
  constructor() {
    super();
    this.state = {
      name: "Foo",
      auctions: [],
      singleAuction: {},
      image: "",
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      currentLocation: {
        lat: null,
        lng: null
      }
    };
    this.handleSeeDetails = this.handleSeeDetails.bind(this);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  async componentDidMount() {
    // let holdArr = [1, 3, 4];
    // let auctionsQuery = fireApp.firestore().collection("auctions");

    this.setState({
      auctions: await getAuctionsData()
    });
    console.log("-->   ", this.state);

    this.unregisterAuthObserver = fireApp.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  }

  handleSeeDetails(singleAuction) {
    this.setState({
      singleAuction,
      currentLocation: {
        lat: singleAuction.location.geoPosition._lat,
        lng: singleAuction.location.geoPosition._lng
      }
    });
    this.openNav();
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.closeNav);
  }
  openNav() {
    // const style = { width: "80%" };
    // this.setState({ style });
    document.body.style.backgroundColor = "#F3F3F3";
  }

  closeNav() {
    // const style = { width: 0 };
    // this.setState({ style });
    document.body.style.backgroundColor = "white";
    this.setState({
      singleAuction: {}
    });
  }

  render() {
    return (
      <div>
        <Heading m={3}>Auctions</Heading>
        <hr />
        <Flex wrap justifyContent="center">
          {this.state.auctions.map(auction => (
            <Box key={auction.id} m={3} width={[1, 1 / 2, 1 / 2, 1 / 3, 1 / 4]}>
              <Card
                boxShadowSize="xl"
                borderWidth={1}
                bg="lightBlue"
                borderRadius={20}
                p={2}
              >
                <Banner showIcon={false} bg="lightBlue" p={2}>
                  <Flex>
                    <Icon name="CarCircle" />
                    <Box pl={2}>
                      <Heading fontSize={2} bold>
                        {auction.location.city}, {auction.location.state}
                      </Heading>
                      <Divider />
                      <Text>
                        Start:{" "}
                        {moment
                          .unix(auction.availableStartDate.seconds)
                          .format("ddd, h:mm:ss a")}
                      </Text>
                      <Text>
                        End:{" "}
                        {moment
                          .unix(auction.availableEndDate.seconds)
                          .format("ddd, h:mm:ss a")}
                      </Text>
                      <Divider />
                      <Text>Minimum Bid: ${auction.minimumBid}</Text>
                      <Text>Grab Now Bid: ${auction.buyNowBid}</Text>
                      <Divider />
                      <Text bold color="red">
                        Ends:{" "}
                        {moment
                          .unix(auction.auctionEndDate.seconds)
                          .format("ddd, h:mm:ss a")}
                      </Text>
                      <OutlineButton
                        size="small"
                        onClick={e => this.handleSeeDetails(auction)}
                      >
                        See Details
                      </OutlineButton>
                    </Box>
                  </Flex>
                </Banner>
              </Card>
            </Box>
          ))}
        </Flex>

        {this.state.singleAuction.id && (
              <OverLayContainer>

                <Box bg="lightGray" color="text">
                    <a
                      href="javascript:void(0)"
                      onClick={this.closeNav}
                    >
                      <Icon name="Close" color="red" />
                    </a>
                      <Box key={this.state.singleAuction.id}>
                        <Text px={2}>
                          {this.state.singleAuction.location.city},{" "}
                          {this.state.singleAuction.location.state}
                        </Text>
                        <Text px={2}>
                          Minimum Bid: ${this.state.singleAuction.minimumBid}
                        </Text>
                        <Text px={2}>
                          Grab Now Bid: ${this.state.singleAuction.buyNowBid}
                        </Text>
                      </Box>
                  <AddBid auctionId={this.state.singleAuction.id} />
                </Box>

                </OverLayContainer>
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleConfig.GOOGLE_API_KEY
})(AuctionList);
