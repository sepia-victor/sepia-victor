import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Import the Firebase App as configured for our setup
import "./App.css";
import { ThemeProvider } from "pcln-design-system";

// Import navbar, landing & footer components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer.js";
import SideDrawer from "./components/layout/SideDrawer";
import Backdrop from "./components/layout/Backdrop";
import Auction from "./components/auctions/Auction";

// //Import the ACTUAL firebase library
// import firebase from 'firebase';
// //Import the Firebase Authorization
// import 'firebase/auth';
// //Import the Firebase UI package
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

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
      return { sideDrawerOpen: !prevState.sideDrawerOpen};
    });
    console.log(this.state.sideDrawerOpen)
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
    console.log(this.state.sideDrawerOpen)
  };
 
  //uiConfig - this is a set of configuration tools that will be used by the React-FirebaseUI module
  // uiConfig = {
  //   signInFlow: 'popup',
  //   signInOptions: [
  //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //     firebase.auth.EmailAuthProvider.PROVIDER_ID
  //   ]
  // };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     auctions: [],
  //     isSignedIn: undefined
  //   };
  // }
  // componentWillMount() {
  //   let auctionsQuery = fireApp.firestore().collection('auctions');
  //   auctionsQuery.doc('H8ud54fFftYOdZWdgD2v').onSnapshot(doc => {
  //     console.log('Current data', doc.data());
  //     this.unregisterAuthObserver = fireApp.auth().onAuthStateChanged(user => {
  //       this.setState({ isSignedIn: !!user });
  //     });
  //   });

  // auctionsRef("child_added", snapshot => {
  //   let auction = { userId: snapshot.val(), id: snapshot.key };
  //   this.setState({ auctions: [auction].concat(this.state.auctions) });
  // });
  // }

  // componentWillUnmount() {
  //   this.unregisterAuthObserver();
  // }

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <ThemeProvider>
        <Router>
          <div className="App">
            <div style={{ height: "100%" }}>
              <Navbar drawerClickHandler={this.drawerToggleClickHandler} />
              <SideDrawer show={this.state.sideDrawerOpen}  />
              
              {backdrop}
              <main style={{ marginTop: "64px" }}>
                <p>This is the page content!</p>
              </main>
              <SideDrawer />
              <Route exact path="/" component={Landing} />
              <Route exact path="/auctions" component={Auction} />
              <Footer />
            </div>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
