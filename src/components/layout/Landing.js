import React from 'react';
import { Redirect } from 'react-router';
import logo from '../../logo.svg';
//Import the Firebase App as configured for our setup
import fireApp from '../../fire';
import '../../App.css';
import './Navbar.css';
import {
  ThemeProvider,
  Link,
  Box,
  Heading,
  BackgroundImage
} from 'pcln-design-system';

//Import the ACTUAL firebase library
import firebase from 'firebase';
//Import the Firebase Authorization
import 'firebase/auth';
//Import the Firebase UI package
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// function Auctions(){
//   this.dialogs = {}
//   var that = this;
//   fire.auth().signInAnonymously().then(function(){
//     that.initTemplates();
//   })
// }

class Landing extends React.Component {
  //uiConfig - this is a set of configuration tools that will be used by the React-FirebaseUI module
  uiConfig = {
    signInFlow: 'popup',
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
    let auctionsQuery = fireApp.firestore().collection('auctions');
    auctionsQuery.doc('H8ud54fFftYOdZWdgD2v').onSnapshot(doc => {
      console.log('Current data', doc.data());
      this.unregisterAuthObserver = fireApp.auth().onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user });
      });
    });
    // auctionsRef("child_added", snapshot => {
    //   let auction = { userId: snapshot.val(), id: snapshot.key };
    //   this.setState({ auctions: [auction].concat(this.state.auctions) });
    // });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return (
      <div>
        <ThemeProvider>
          <BackgroundImage
            height="500px"
            image="https://images.pexels.com/photos/6517/parking-multi-storey-car-park.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500-cpa.com/wp-https://encrypted-tbn0.gstatic.com/images?q=tbn:http://efc.web.unc.edu/files/2014/06/ParkingLot.jpg/uploads/2019/01/parking-lot.jpg"
          >
            <Heading pl={8} align="center">
              {this.state.isSignedIn !== undefined && !this.state.isSignedIn && (
                <Box pt={6}>
                  <StyledFirebaseAuth
                    uiConfig={this.uiConfig}
                    firebaseAuth={fireApp.auth()}
                  />
                </Box>
              )}
            </Heading>

            {this.state.isSignedIn && <Redirect to="/maps" />}
          </BackgroundImage>

          {/* <div className="Landing">
          <header className="Landing-header">
            <img src={logo} className="Landing-logo" alt="logo" />
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
              <Redirect to="/maps" />
            )}
          </header>
        </div> */}
        </ThemeProvider>
      </div>
    );
  }
}

export default Landing;
