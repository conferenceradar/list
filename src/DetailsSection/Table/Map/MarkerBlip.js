import React, { Component } from 'react';

import { MapBlip, MapInfo } from './styles';

export default class MarkerBlip extends Component {
  constructor(props) {
    super(props);
    console.log("this.props", this.props);
    this.state = { showInfo: false };
  }

  onMouseEnter = () => {
    this.setState({ showInfo: true });
  }

  onMouseLeave = () => {
    this.setState({ showInfo: false })
  }

  render() {
    return (
      <div
        onMouseLeave={this.onMouseLeave}
        key={this.props.url}
      >
        <MapBlip
          onMouseEnter={this.onMouseEnter}
          status={this.props.status}
        />
        {this.state.showInfo &&
          <MapInfo>
            <h4 style={{ margin: 0 }}>{this.props.name}</h4>
            {this.props.url && <a href={this.props.url}>{this.props.url}</a>}
          </MapInfo>
        }
      </div>
    )
  }
}