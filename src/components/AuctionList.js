import React, { Component } from "react";
import { error } from "util";

import fireApp from "../fire";
import { Card, Heading } from "pcln-design-system";
import firebase from "firebase";

export default class AuctionList extends Component {
  constructor() {
    super();
    this.state = {
      name: "Foo",
      auctions: []
    };
  }

  async getDataArray(){
    let auctionsQuery = fireApp.firestore().collection("auctions");
    try {
        let holdArr = []
        let snapshot = await auctionsQuery.get();
        await snapshot.forEach(async doc => {
          await holdArr.push(doc.data());
        });
        return await holdArr
      } catch (error) {
        console.error(error);
      }
  }

  async componentDidUpdate(){
    // console.log(this.getDataArray())
    // this.setState({
    //   name: 'Bar',
    //   auctions: await this.getDataArray()
    // });
  }

  async componentDidMount() {
    let holdArr = [1,3,4];
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
      name: 'Bar',
      auctions: await this.getDataArray()
    });
    console.log(this.state)

    // await auctionsQuery.get().then(async snapshot => await snapshot.forEach(doc=> holdArr.push(doc.data()))).then( console.log(holdArr)).catch(err=>console.error(err));

    this.unregisterAuthObserver = fireApp.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  }

  render() {
    return (
    <div>
      {this.state.auctions.map(auction =>(
        <div>
          {auction.userId}
        </div>
      ))}
    </div>);
  }
}
