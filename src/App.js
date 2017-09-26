// This is mostly just hacks -- this is NOT necessarily 
// an indicator of how one should be writing code.
// </disclaimer>

import React, { Component } from 'react';
import styled from 'styled-components';
import Griddle, { plugins, RowDefinition, ColumnDefinition, utils } from 'griddle-react';
import debounce from 'lodash.debounce';
import conferences from './events.json';
import GoogleMapReact from 'google-map-react';
import CardList from './CardList';

import Add from './Add';
import './App.css';
import NoResults from './NoResults';
import moment from 'moment';
import UpdatePlugin from './UpdatePlugin';
import { mapKey } from './mapKey';

import {
  ToggleButton,
  Header,
  Footer,
  FooterLeft,
  FooterRight,
} from './styles';

import {
  MapBlip,
  MapInfo,
  GriddleWrapper,
  ButtonGroupWrapper,
  ContentWrapper,
  MapWrapper,
  TableWrapper,
  FilterInput,
  LocationWrapper,
  DateColumnWrapper
} from './Map/styles';

import EventDate from './Map/EventDate';
import CfpDate from './Map/EventDate';

import { locationSortMethod, sortMethod } from './utils/sort';

import settings from './settings';

const { connect } = utils;

class Filter extends Component {
  constructor(props) {
    super(props);

    // TODO: Don't do this
    this.setFilterDebounced = debounce(this.props.setFilter, 300);
  }

  setFilter = (e) => {
    this.setFilterDebounced(e.target.value);
  }

  render() {
    return (
      <FilterInput
        type="text"
        name="filter"
        className="input"
        placeholder="Filter"
        onChange={this.setFilter}
      />
    )
  }
}

class MarkerBlip extends Component {
  constructor(props) {
    super(props);
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

const Empty = (props) => <span />;
const Name = ({value, rowData}) => (
  <strong>
    { rowData.url ?
      <a href={rowData.url} target="_blank">{value}</a> :
      value
    }
  </strong>)

const Location = ({ rowData }) => (
  <LocationWrapper>
    <small>{rowData.city} {rowData.stateProvince}</small>
    <small>{rowData.country}</small>
  </LocationWrapper>
)

const Map = connect((state, props) => ({
  visibleData: plugins.LocalPlugin.selectors.filteredDataSelector(state),
}))(({ rowIds, Row, visibleData, filter }) => {
  const data = visibleData.toJSON();
  return (
      <GoogleMapReact
        defaultCenter={{ lat: 42.28, lng: -83.74 }}
        defaultZoom={4}
        bootstrapURLKeys={{
          key: mapKey,
        }}
      >
        {visibleData && data.map(r => <MarkerBlip key={r.name + r.city + r.country + r.eventStartDate} griddleKey={r.name} lat={r.latitude} lng={r.longitude} {...r} />)}
      </GoogleMapReact>
  )
});

const Layout = ({ Table, Pagination, Filter }) => (
  <GriddleWrapper>
    <Filter />
    <ContentWrapper>
      <MapWrapper>
        <Map />
      </MapWrapper>
      <TableWrapper>
        <Table />
      </TableWrapper>
    </ContentWrapper>
  </GriddleWrapper>
);

const EnhanceWithRowData = connect((state, props) => ({
  rowData: plugins.LocalPlugin.selectors.rowDataSelector(state, props)
}));

class VirtualScrollTable extends Component {
  render() {
    const { data } = this.props;

    return (
      <Griddle
        data={data}
        plugins={[UpdatePlugin, plugins.LocalPlugin, plugins.PositionPlugin({ tableHeight: 799, rowHeight: 92 })]}
        pageProperties={{
          pageSize: 1000000
        }}
        styleConfig={{
          classNames: {
            Table: 'table'
          }
        }}
        components={{
          Filter: Filter,
          SettingsToggle: Empty,
          Pagination: Empty,
          Layout: Layout,
          NoResults
        }}
      >
        <RowDefinition>
          <ColumnDefinition
            id='name'
            title="Name"
            order={1}
            customComponent={EnhanceWithRowData(Name)}
            sortMethod={sortMethod}
          />
          <ColumnDefinition
            id='city'
            title="Location"
            order={2}
            customComponent={EnhanceWithRowData(Location)}
            sortMethod={locationSortMethod}
          />
          <ColumnDefinition
            id='eventStartDate'
            title='Event Date'
            order={3}
            customComponent={EnhanceWithRowData(EventDate)}
            sortMethod={sortMethod}
          />
          <ColumnDefinition
            id='cfpEndDate'
            title='CFP Date'
            order={4}
            customComponent={EnhanceWithRowData(CfpDate)}
            sortMethod={sortMethod}
          />
        </RowDefinition>
      </Griddle>
    )
  }
}

const ButtonGroup = ({onSelect, selected, toggleForm, isMobile}) => {
  return (
    <ButtonGroupWrapper className="field has-addons">
      <div className="control">
        <a className={`button ${selected === 'all' && 'is-primary'}`} onClick={() => onSelect('all')}>
          <span>All</span>
        </a>
      </div>
      <div className="control">
        <a className={`button ${selected === 'upcoming' && 'is-primary'}`} onClick={() => onSelect('upcoming')}>
          <span>Upcoming</span>
        </a>
      </div>
      <div className="control">
        <a className={`button ${selected === 'openCfps' && 'is-primary'}`} onClick={() => onSelect('openCfps')}>
          <span>Open CFPs</span>
        </a>
      </div>
      { !isMobile &&
        <ToggleButton onClick={toggleForm} className="button is-small">Toggle 'Add Event' Form</ToggleButton>
      }
    </ButtonGroupWrapper>
  )
}
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