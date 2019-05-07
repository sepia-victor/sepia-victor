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

<<<<<<< HEAD
//Import the ACTUAL firebase library
import firebase from "firebase";
//Import the Firebase Authorization
import "firebase/auth";
//Import the Firebase UI package
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import AuctionList from "./components/AuctionList";
=======
// //Import the ACTUAL firebase library
// import firebase from 'firebase';
// //Import the Firebase Authorization
// import 'firebase/auth';
// //Import the Firebase UI package
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
>>>>>>> ReggieLandingPage

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
<<<<<<< HEAD
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      auctions: [],
      isSignedIn: undefined
    };
  }

  componentWillMount() {
    let auctionsQuery = fireApp.firestore().collection("auctions")
    auctionsQuery.get().then(snapshot => { snapshot.forEach(doc => console.log(doc.data()))});

    this.unregisterAuthObserver = fireApp.auth().onAuthStateChanged(user => {
          this.setState({ isSignedIn: !!user });
    })
    // let auctionsQuery = fireApp.firestore().collection("auctions");
    // auctionsQuery.doc("H8ud54fFftYOdZWdgD2v").onSnapshot(doc => {
    //   console.log("Current data", doc.data());
    //   this.unregisterAuthObserver = fireApp.auth().onAuthStateChanged(user => {
    //     this.setState({ isSignedIn: !!user });
    //   });
    // });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
=======
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
>>>>>>> ReggieLandingPage

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <ThemeProvider>
<<<<<<< HEAD
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              <code>Hello World!</code>
            </p>
            <ul>
              {this.state.auctions.map(auction => (
                <li key={auction.id}>{auction.userId}</li>
              ))}
            </ul>
            {this.state.isSignedIn !== undefined && !this.state.isSignedIn && (
              <div>
                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={fireApp.auth()}
                />
              </div>
            )}
            {this.state.isSignedIn && (
              <div>
                Hello {fireApp.auth().currentUser.displayName}. You are now
                signed In!
                <a type="button" onClick={() => fireApp.auth().signOut()}>
                  Sign Out
                </a>
              </div>
            )}
            <AuctionList />
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
=======
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
>>>>>>> ReggieLandingPage
      </ThemeProvider>
    );
  }
}

export default App;
