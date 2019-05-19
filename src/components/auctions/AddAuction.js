import React, { Component } from "react";
// import styled from "styled-components";
import firebase from "firebase";
import moment from "moment";
import Geocode from "react-geocode";
import keys from "../../keys";
import fireApp from "../../fire";
import {addAuction} from '../../scripts/Auctions.Data'
import {Redirect} from 'react-router-dom'

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
  Divider,
  Input,
  Label,
  FormField,
  InputGroup,
  RedButton
} from "pcln-design-system";


let submitted = false

class AddAuction extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    Geocode.setApiKey(keys.GOOGLE_API_KEY);
  }

  handleChange(event) {
    event.preventDefault();
    let fieldName = event.target.name;
    let fieldValue = event.target.value;
    let fieldType = event.target.type;
    // console.log("--->name   ", fieldName);
    // console.log("--->value   ", fieldValue);
    // console.log("--->type   ", fieldType);
    if (fieldType === "number") {
      fieldValue = Number(fieldValue);
    } else if (fieldType === "date") {
      let unixFieldValue = moment(fieldValue).unix();
      // console.log("--->momentUnix   ", unixFieldValue);
      fieldValue = new firebase.firestore.Timestamp(unixFieldValue, 0);
      // console.log("--->moment   ", fieldValue);
    }
    this.setState({
      [fieldName]: fieldValue
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let geoPoint = {};
    let newAuctionData
    Geocode.fromAddress(
      `${this.state.streetAddress}, ${this.state.city} ${this.state.state}`
    ).then(
      response => {
        geoPoint = response.results[0].geometry.location;
        // console.log("loc--->   ", geoPoint);
        newAuctionData = {...this.state}
        newAuctionData.userId = fireApp.auth().currentUser.uid;
        newAuctionData.geoPoint = new firebase.firestore.GeoPoint(geoPoint.lat, geoPoint.lng);
        addAuction(newAuctionData)

        submitted = true
        console.log(submitted);

        this.props.history.push('/maps')

      },
      error => {
        console.error(error);
      }
    );



  }

  render() {
    return (
      <Container maxWidth={650}>
        <Heading m={3}>Add New Auction</Heading>
        <hr />


          <Flex flexDirection="column">
          <Heading fontSize={2}>Parking Spot Available</Heading>
            <Flex flexDirection='row'>
            <InputGroup>
            <FormField>
              <Label fontSize={2}>From:</Label>
              <Input
                name="availableStartDate"
                placeholder="Start Date?"
                type="date"
                borderColor = 'blue'
                onChange={this.handleChange}
              />
            </FormField>
            <FormField>
              <Label>To:</Label>
              <Input
                name="availableEndDate"
                placeholder="End Date?"
                type="date"
                onChange={this.handleChange}
                />
            </FormField>
                </InputGroup>
            </Flex>

            <Divider />
            <Heading fontSize={2}>Auction Runs</Heading>
            <Flex flexDirection='row'>
            <InputGroup>
            <FormField>
              <Label>From:</Label>
              <Input
                name="auctionStartDate"
                type="date"
                onChange={this.handleChange}
              />
            </FormField>
            <FormField>
              <Label>To:</Label>
              <Input
                name="auctionEndDate"
                placeholder="End Date?"
                type="date"
                onChange={this.handleChange}
              />
            </FormField>
            </InputGroup>
            </Flex>

            <Divider />

            <FormField>
              <Label>Street Adress:</Label>
              <Input
                name="streetAddress"
                placeholder="404 Content Lane"
                onChange={this.handleChange}
              />
            </FormField>
            <FormField>
              <Label>City:</Label>
              <Input
                name="city"
                placeholder="Proxy Town"
                onChange={this.handleChange}
              />
            </FormField>
            <FormField>
              <Label>State:</Label>
              <Input
                name="state"
                placeholder="Arizona"
                onChange={this.handleChange}
              />
            </FormField>

            <Divider />

            <FormField>
              <Icon name="DollarCircle" color="text" size="20" />
              <Label>Minimum Bid:</Label>
              <Input
                type="number"
                name="minimumBid"
                placeholder="0"
                mb={3}
                onChange={this.handleChange}
              />
            </FormField>

            <RedButton size="medium" ml={3} mb={5} onClick={this.handleSubmit}>
              Submit Auction
            </RedButton>
          </Flex>
      </Container>
    );
  }
}

export default AddAuction;
