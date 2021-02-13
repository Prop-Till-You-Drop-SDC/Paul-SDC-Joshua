import React from 'react';
import axios from 'axios';

import Listing from './Listing.jsx';
import Thing from './Thing.jsx';
import Arrow from './Arrow.jsx';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoaded: false,
      thingsLoaded: false,
      currentLocation: 'Wisconsin',
      listings: [],
      pageOne: [],
      pageTwo: [],
      pageThree: [],
      currentPage: 1,
      things: [],
      thingsOne: [],
      thingsTwo: [],
      thingsThree: [],
      thingsFour: [],
      currentPageThings: 1,
    }
    this.bgrd = {
      backgroundColor: 'rgb(247, 247, 247)',
    }
    this.design = {
      fontFamily: 'Montserrat',
      maxWidth: '1128px',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingTop: '20px',
      paddingBottom: '20px'
    }
    this.headerStyle = {
      display: 'flex',
      justifyContent: 'space-between'
    }
    this.arrowContainer = {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: '20px'
    }
    this.listContainer = {
      display: 'flex',
      justifyContent: 'space-between'
    }
    this.listStyle = {
      width: '250px',
      marginTop: '-5px',
      marginBottom: '-5px'
    }
    this.thingStyle = {
      width: '250px',
      marginTop: '-5px',
      marginBottom: '-5px'
    }

    this.previousSlide = this.previousSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlideThings = this.previousSlideThings.bind(this);
    this.nextSlideThings = this.nextSlideThings.bind(this);
  }

  componentDidMount() {
    let searchLoc = this.state.currentLocation;
    this.getListings(searchLoc);
    this.getThings(searchLoc);
  }

  getListings(loc) {
    axios.get('http://localhost:3003/places/' + loc)
      .then((res) => {
        this.setState({
          isLoaded: true,
          listings: res.data,
          pageOne: res.data.slice(0, 4),
          pageTwo: res.data.slice(4, 8),
          pageThree: res.data.slice(8)
        });
      })
  }

  getThings(loc) {
    axios.get('http://localhost:3003/todos/' + loc)
    .then((res) => {
      this.setState({
        thingsLoaded: true,
        things: res.data,
        thingsOne: res.data.slice(0, 5),
        thingsTwo: res.data.slice(5, 10),
        thingsThree: res.data.slice(10, 15),
        thingsFour: res.data.slice(15)
      });
    })
  }

  //  Carousel Arrows
  previousSlide() {
    if(this.state.currentPage === 1) {
      // Go to page 3
      this.setState({
        ...this.state,
        currentPage: 3
      });
    } else {
      // Go to prev page
      const currentPage = this.state.currentPage - 1;
      this.setState({
        ...this.state,
        currentPage
      });
    }
  }

  nextSlide() {
    if (this.state.currentPage === 3) {
      this.setState({
        ...this.state,
        currentPage: 1
      });
    } else {
      const currentPage = this.state.currentPage + 1;
      this.setState({
        ...this.state,
        currentPage
      });
    }
  }

  previousSlideThings() {
    if(this.state.currentPageThings === 1) {
      // Go to page 4
      this.setState({
        ...this.state,
        currentPageThings: 4
      });
    } else {
      // Go to prev page
      const currentPageThings = this.state.currentPageThings - 1;
      this.setState({
        ...this.state,
        currentPageThings
      });
    }
  }

  nextSlideThings() {
    if (this.state.currentPageThings === 4) {
      this.setState({
        ...this.state,
        currentPageThings: 1
      });
    } else {
      const currentPageThings = this.state.currentPageThings + 1;
      this.setState({
        ...this.state,
        currentPageThings
      });
    }
  }

  render() {
    return (
      <div style={this.bgrd}>
        <div style={this.design}>
          <div style={this.headerStyle}>
            <h2>More places to stay</h2>
            <div style={this.arrowContainer}>
              <p>{this.state.currentPage} / 3</p>
              <Arrow direction="left" click={this.previousSlide} />
              <Arrow direction="right" click={this.nextSlide} />
            </div>
          </div>
          <div style={this.listContainer}>
            {
              this.state.isLoaded ?
                (this.state.currentPage === 1 ?
                  this.state.pageOne.map((listings) => {
                    return (
                      <div style={this.listStyle}>
                        <Listing listing={listings} />
                      </div>
                    )
                  }) :
                  this.state.currentPage === 2 ?
                    this.state.pageTwo.map((listings) => {
                      return (
                        <div style={this.listStyle}>
                          <Listing listing={listings} />
                        </div>
                      )
                    }) :
                    this.state.pageThree.map((listings) => {
                      return (
                        <div style={this.listStyle}>
                          <Listing listing={listings} />
                        </div>
                      )
                    })
                  ) :
              <p>Loading</p>
            }
          </div>
          <div style={this.headerStyle}>
            <h2>Things to do nearby</h2>
            <div style={this.arrowContainer}>
              <p>{this.state.currentPageThings} / 4</p>
              <Arrow direction="left" click={this.previousSlideThings} />
              <Arrow direction="right" click={this.nextSlideThings} />
            </div>
          </div>
          <div style={this.listContainer}>
          {
              this.state.thingsLoaded ?
                (this.state.currentPageThings === 1 ?
                  this.state.thingsOne.map((things) => {
                    return (
                      <div style={this.thingStyle}>
                        <Thing thing={things} />
                      </div>
                    )
                  }) :
                  this.state.currentPageThings === 2 ?
                    this.state.thingsTwo.map((things) => {
                      return (
                        <div style={this.thingStyle}>
                          <Thing thing={things} />
                        </div>
                      )
                    }) :
                    this.state.currentPageThings === 3 ?
                    this.state.thingsThree.map((things) => {
                      return (
                        <div style={this.thingStyle}>
                          <Thing thing={things} />
                        </div>
                      )
                    }) :
                    this.state.thingsFour.map((things) => {
                      return (
                        <div style={this.thingStyle}>
                          <Thing thing={things} />
                        </div>
                      )
                    })
                  ) :
              <p>Loading</p>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App;
