import React from "react";
import logo from "./logo.svg";
//Import the Firebase App as configured for our setup
import fireApp from "./fire";
import "./App.css";
import { ThemeProvider, Card, Heading } from "pcln-design-system";

//Import the ACTUAL firebase library
import firebase from "firebase";
//Import the Firebase Authorization
import "firebase/auth";
//Import the Firebase UI package
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import AuctionList from "./components/AuctionList";

// function Auctions(){
//   this.dialogs = {}
//   var that = this;
//   fire.auth().signInAnonymously().then(function(){
//     that.initTemplates();
//   })
// }

class App extends React.Component {
  //uiConfig - this is a set of configuration tools that will be used by the React-FirebaseUI module
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

  render() {
    return (
      <ThemeProvider>
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
      </ThemeProvider>
    );
  }
}

export default App;
