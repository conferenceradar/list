// This is mostly just hacks -- this is NOT necessarily 
// an indicator of how one should be writing code.
// </disclaimer>

import React, { Component } from 'react';
import conferences from './events.json';
import CardList from './Map/CardList';
import Add from './Add';
import './App.css';
import moment from 'moment';
import ButtonGroup from './ButtonGroup';
import {
  Header,
  Footer,
  FooterLeft,
  FooterRight,
} from './styles';

import VirtualScrollTable from './Map/VirtualScrollTable';

import settings from './settings';

class App extends Component {
  state = { dataType: 'all', showForm: false }

  onSelect=(dataType) => {
    this.setState({ dataType });
  }

  onToggleForm = () => {
    this.setState(prevState => ({ showForm: !prevState.showForm }))
  }

  getData = () => {
    const { dataType } = this.state;

    switch(dataType) {
      case 'upcoming':
        return conferences.filter(conference => (
          conference.eventStartDate && conference.eventStartDate > moment().toISOString()
        ))
      case 'openCfps':
        return conferences.filter(conference => (
          conference.cfpEndDate && conference.cfpEndDate > moment().toISOString()
        ))
      default:
        return conferences;
    }
  }

  render() {
    const data = this.getData();

    const isMobileish = window.innerWidth < settings.mobileWidth;
    const ListComponent = isMobileish ?
      <CardList data={data} /> :
      <VirtualScrollTable data={data}/>;

    return (
      <div>
      <Header>
        <h1>Conference Radar</h1>
        <div>
          <p>
            Know of a conference not listed? Notice an issue?
          </p>
          <a href="https://github.com/conferenceradar/list">Contribute to this project on GitHub</a>
        </div>
      </Header>
      <ButtonGroup
        onSelect={this.onSelect}
        selected={this.state.dataType}
        toggleForm={this.onToggleForm}
        isMobile={isMobileish}
      />
      { !isMobileish && this.state.showForm && <Add /> }
      {ListComponent}
      <Footer>
        <FooterLeft>
          <p>
            The data is based on conference lists from <a href="https://twitter.com/heathriel">Heather Wilde</a> and <a href="https://twitter.com/housecor">Cory House</a>.
          </p>
          <p>
            Site compiled by <a href="https://twitter.com/ryanlanciaux">Ryan Lanciaux</a> using <a href="https://github.com/facebookincubator/create-react-app">Create React App</a> with <a href="http://griddlegriddle.github.io/Griddle">Griddle</a>
          </p>
        </FooterLeft>
        <FooterRight>
          <small>
            This is a community maintained site/list provided as-is without guarantee or warranty. If you notice an issue or innacuracy, please <a href="https://github.com/conferenceradar/list">file an issue/PR on GitHub</a>. 
          </small>
        </FooterRight>
      </Footer>
      </div>
    );
  }
}

export default App;