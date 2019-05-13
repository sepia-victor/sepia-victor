import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { getAuctionsData } from '../../scripts/Auctions.Data';

const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
};

const nearbyLocationIds = [];

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      currAuctions: [],
      redirect: false,
      markerId: 0
    };

    this.routeChange = this.routeChange.bind(this);
  }

  routeChange() {
    console.log('clicked Marker');
    this.setState({ redirect: true });
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            },
            currAuctions: await getAuctionsData()
          });
          console.log('currAuctions: ', this.state.currActions);
        });
      }
    }
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );
      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }

  onMarkerClick(props, marker, e) {
    this.state.redirect = true;
  }

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);

      let geoCircle = new maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this.map,
        center: center,
        radius: 333
      });

      for (let i = 0; i < this.state.currAuctions.length; i++) {
        let markerLat = this.state.currAuctions[i].location.geoPosition._lat;
        let markerLng = this.state.currAuctions[i].location.geoPosition._long;
        console.log('markerLat: ', markerLat);
        console.log('markerLng: ', markerLng);
        // const routeChange = () => {
        //   return <Redirect to="/auctions" />;

        if (
          Math.abs(markerLat - current.lat) <= 0.003 &&
          Math.abs(markerLng - current.lng) <= 0.003
        ) {
          let marker = new maps.Marker({
            id: this.state.currAuctions[i].id,
            position: new maps.LatLng(markerLat, markerLng),
            map: this.map,
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }
          });
          marker.addListener('click', this.routeChange);

          if (this.state.markerId === marker.id) {
            this.map.setCenter({ lat: markerLat, lng: markerLng });
          }

          nearbyLocationIds.push(marker.id);
          console.log('nearbyLocationIds===> ', nearbyLocationIds);
        }
      }
    }
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  }

  render() {
    const style = Object.assign({}, mapStyles.map);
    console.log('nearbyLocationIds--->  ', nearbyLocationIds);
    if (this.state.redirect) {
      return (
        <div>
          {nearbyLocationIds.length > 0 && (
            <Redirect
              push
              to={{
                pathname: '/auctions',
                state: { nearbyLocationIds: nearbyLocationIds }
              }}
            />
          )}
        </div>
      );
    } else {
      return (
        <div>
          <div style={style} ref="map">
            Loading map...
          </div>
          {this.renderChildren()}
        </div>
      );
    }
  }
}

export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 16,
  initialCenter: {
    lat: 40.7128,
    lng: -74.006
  },
  centerAroundCurrentLocation: false,
  visible: true
};
