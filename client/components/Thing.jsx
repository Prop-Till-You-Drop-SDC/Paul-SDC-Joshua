import React from 'react';
import styled from 'styled-components';

const HeartStyle = styled.span`
  background-color: black;
  display: inline-block;
  height: 12px;
  margin: 0 10px;
  position: relative;
  top: 0;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(-45deg);
  width: 16px;
  &:before,
  &:after {
    content: "";
    background-color: black;
    border-radius: 50%;
    height: 12px;
    position: absolute;
    width: 12px;
  }
  &:before {
    top: -8px;
    left: 0;
  }
  &:after {
    left: 8px;
    top: 0;
  }
`
const HeartClicked = styled.span`
  background-color: red;
  display: inline-block;
  height: 12px;
  margin: 0 10px;
  position: relative;
  top: 0;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(-45deg);
  width: 16px;
  &:before,
  &:after {
    content: "";
    background-color: red;
    border-radius: 50%;
    height: 12px;
    position: absolute;
    width: 12px;
  }
  &:before {
    top: -8px;
    left: 0;
  }
  &:after {
    left: 8px;
    top: 0;
  }
`

class Thing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false
    }
    this.imgStyle = {
      borderRadius: '5%',
      height: '300px',
      width: '220px'
    }
    this.priceStyle = {
      fontWeight: 900
    }
    this.noRevStyle = {
      margin: '2px',
      fontWeight: 'lighter'
    }
    this.descStyle = {
      margin: '2px',
      fontWeight: 400
    }
    this.startColor = {
      color: '#FF385C'
    }
    this.reviewContStyle = {
      paddingBottom: '5px'
    }
    this.descContainerStyle = {
      paddingBottom: '5px'
    }
    this.imgContainer = {
      position: 'relative'
    }
    this.heartContainer = {
      position: 'absolute',
      top: '10px',
      right: '5px'
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    let isClicked = !this.state.isClicked;
    this.setState({isClicked})
  }

  render() {
    return (
      <div id='listingContainerThing'>
        <div id='imgContainerThing' style={this.imgContainer}>
          <div style={this.heartContainer} onClick={this.clickHandler}>
            {
              this.state.isClicked ? <HeartClicked></HeartClicked> :
                <HeartStyle></HeartStyle>
            }
          </div>
          <img src={this.props.thing.picture} style={this.imgStyle} />
        </div>
        <div id='reviewContainerThing' style={this.reviewContStyle}>
          {
            (this.props.thing.revnum === 0) ?
              <p style={this.noRevStyle}>No reviews yet</p> :
              <p style={this.noRevStyle}><span style={this.startColor}>&#x2605; </span>{this.props.thing.revnum}({this.props.thing.revamount})</p>
          }
        </div>
        <div id='descContainerThing' style={this.descContainerStyle}>
          <p style={this.descStyle}>{this.props.thing.description}</p>
        </div>
        <div id='priceContainerThing'>
          <p style={this.noRevStyle}><span style={this.priceStyle}>From ${this.props.thing.price}</span> / person</p>
        </div>
      </div>
    )
  }
}

export default Thing;