import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Import the Firebase App as configured for our setup
import './App.css';
import { ThemeProvider } from 'pcln-design-system';

// Import navbar, landing & footer components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer.js';
import SideDrawer from './components/layout/SideDrawer';
import Backdrop from './components/layout/Backdrop';
import Auction from './components/auctions/AuctionList';
import MapContainer from './components/maps/MapContainer';

//Import the ACTUAL firebase library
import firebase from 'firebase';
//Import the Firebase Authorization
import 'firebase/auth';
//Import the Firebase UI package
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import AddBid from './components/bids/AddBid';
import { highestBidData } from './scripts/Bids.Data';

// function Auctions(){
//   this.dialogs = {}
//   var that = this;
//   fire.auth().signInAnonymously().then(function(){
//     that.initTemplates();
//   })
// }

class App extends React.Component {
  state = {
    sideDrawerOpen: false
  };
  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
    console.log(this.state.sideDrawerOpen);
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
    console.log(this.state.sideDrawerOpen);
  };

  async componentDidMount() {
    let highBid = await highestBidData('H8ud54fFftYOdZWdgD2v');
    await console.log('highBid--->  ', highBid);
  }

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <ThemeProvider>
        <Router>
          <div className="App">
            <div style={{ height: '100%' }}>
              <Navbar drawerClickHandler={this.drawerToggleClickHandler} />
              <SideDrawer show={this.state.sideDrawerOpen} />

              {backdrop}
              {/* <main style={{ marginTop: "64px" }}>
                <p>This is the page content!</p>
              </main> */}
              <SideDrawer />
              <div className="container">
                <Route exact path="/" component={Landing} />
                <Route exact path="/auctions" component={Auction} />
                <Route exact path="/maps" component={MapContainer} />
                <Route
                  exact
                  path="/bids"
                  component={AddBid}
                  auctionId="H8ud54fFftYOdZWdgD2v"
                />
                <Footer />
              </div>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
