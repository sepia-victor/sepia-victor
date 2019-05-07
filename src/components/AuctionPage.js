import {Header} from 'pcln-design-system';
import React, { Component } from "react";
import fireApp from "../fire";

import { getSingleAuctionData, addAuction }  from '../scripts/Auctions.Data'

export default class AuctionPage extends Component {
  constructor(props){
    super(props);
    this.state= {
        id: "",
        auction: {}
      }
  }

  async componentDidMount(){

  }
}
