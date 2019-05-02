import React from "react";
import logo from "./logo.svg";
import fire from "./fire";
import "./App.css";

// function Auctions(){
//   this.dialogs = {}
//   var that = this;
//   fire.auth().signInAnonymously().then(function(){
//     that.initTemplates();
//   })
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auctions: []
    };
  }
  componentWillMount() {
    let auctionsQuery = fire.firestore().collection("auctions");
    auctionsQuery.doc("H8ud54fFftYOdZWdgD2v").onSnapshot((doc)=>{
      console.log('Current data', doc.data())
    })
    // auctionsRef("child_added", snapshot => {
    //   let auction = { userId: snapshot.val(), id: snapshot.key };
    //   this.setState({ auctions: [auction].concat(this.state.auctions) });
    // });
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <code>Hello World!</code>
          </p>
          <ul>
            {
              this.state.auctions.map(auction => <li key={auction.id}>
                {auction.userId}
              </li>)
            }
          </ul>
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
    );
  }
}

export default App;
