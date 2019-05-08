import React, { Component } from 'react';
import { Header } from 'pcln-design-system';
import { highestBidData } from '../../scripts/Bids.Data';
import { getSingleAuctionData } from '../../scripts/Auctions.Data';
import fireApp from '../../fire';

class AddBid extends Component {
  constructor(props) {
    super(props);
    this.ref = fireApp
      .firestore()
      .collection('auctions')
      .doc('H8ud54fFftYOdZWdgD2v')
      .collection('bids')
      .orderBy('offer', 'desc');
    this.unsubscribe = null;
    this.state = {
      auction: {},
      user: '',
      userBid: 0,
      highestCurrBid: {},
      unsub: {}
    };
  }

  // ComponentDidMount will get current highest bid in the specific auction
  // Does: Uses AddUserBid function and this.state.props.auctionId(?) to populate this.state.highestCurrBid.
  //Does: Populates this.state.auction with GetSingleAuction from Auction.Data.js
  //Does: Confirm user is authorized to be on this page
  async componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.setState({
      auction: await getSingleAuctionData('H8ud54fFftYOdZWdgD2v')
    });
  }

  onCollectionUpdate = snapshot => {
    const highestCurrArr = [];
    snapshot.forEach((doc, i) => {
      highestCurrArr.push(doc.data());
      // console.log('current arr', highestCurrArr);
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
    return <div>{this.state.highestCurrBid.offer}</div>;
  }
}

export default AddBid;
