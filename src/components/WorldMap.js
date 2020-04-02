import React, { Component } from 'react';
import Datamaps from 'datamaps';

const mapStyle = {
  width: '100%',
  height: 500,
  position: 'relative',
};

class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      mapStyle: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };
  }

  componentDidMount = () => {
    this.map = this.renderMap();

    // Add listener to resize map
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount = () => window.removeEventListener('resize', this.onResize);

  onResize = () => this.map ? this.map.resize() : null;


  renderMap = () => new Datamaps({
    element: document.getElementById('map-container'),
    responsive: true,
    done: function(datamap) {
      datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
          console.log(geography.id);
          if(geography.id === "USA") {
            alert('congratulation!');
          } else {
            alert('You have mistake!');
          }
      });
    },
    arcConfig: {
      strokeColor: '#DD1C77',
      strokeWidth: 1,
      arcSharpness: 1,
      animationSpeed: 600, // Milliseconds
      popupOnHover: true, // True to show the popup while hovering
      popupTemplate: function(geography, data) { // This function should just return a string
        console.log('fdsafdasfdasfd')
        // Case with latitude and longitude
        if ( ( data.origin && data.destination ) && data.origin.latitude && data.origin.longitude && data.destination.latitude && data.destination.longitude ) {
          return '<div class="hoverinfo"><strong>Arc</strong><br>Origin: ' + JSON.stringify(data.origin) + '<br>Destination: ' + JSON.stringify(data.destination) + '</div>';
        }
        // Case with only country name
        else if ( data.origin && data.destination ) {
          return '<div class="hoverinfo"><strong>Arc</strong><br>' + data.origin + ' -> ' + data.destination + '</div>';
        }
        // Missing information
        else {
          return '';
        }
      }
    }
  });

  render = () => <div id="map-container" style={{ ...mapStyle, ...this.state.mapStyle }} />;
}

export default WorldMap;
