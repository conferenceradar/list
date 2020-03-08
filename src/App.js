// This is mostly just hacks -- this is NOT necessarily
// an indicator of how one should be writing code.
// </disclaimer>

import React, { Component } from "react";
import PropTypes from "prop-types";
import Add from "./Add";
import conferences from "./data/events.json";
import archive from "./data/archiveMetadata.json";
import "./App.css";
import moment from "moment";
import ButtonGroup from "./ButtonGroup";
import { isMobileish } from "./utils/layoutUtils";
import {
  getCompressedObject,
  getDecompressedObject
} from "./utils/compressionUtils";
import DetailsSection from "./DetailsSection";
import Share from "./Share";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Header,
  Footer,
  FooterLeft,
  FooterMiddle,
  FooterRight,
  SharedHeadingWrapper,
  AdWrapper
} from "./styles";

const FAVORITE_KEY = "conferenceradar:favorites";

const status = {
  cancelled: "cancelled",
  postponed: "postponed",
  happening: "happening",
  online: "online",
  noInfo: "noInfo"
};

class App extends Component {
  static childContextTypes = {
    favorites: PropTypes.object
  };

  state = {
    dataType: "upcoming",
    showForm: false,
    additionalFilter: ""
  };

  metadataLookup = {};
  upcomingLookup = {};
  metadataKeys = [];
  favoriteKeys = [];

  // this is kind of tricky -- we are rendering data but controlling it through this.state.dataType
  data = {};

  constructor() {
    super();

    //build metadata lookup;
    archive.forEach(item => {
      this.metadataLookup[item.key.toString()] = item;
    });

    this.metadataKeys = [
      "upcoming",
      ...Object.keys(this.metadataLookup).sort((a, b) => b - a)
    ];

    conferences.forEach(item => {
      this.upcomingLookup[item.key] = item;
    });

    this.data["upcoming"] = conferences;
    this.favoriteKeys = this.getFavorites();
  }

  getChildContext() {
    return {
      favorites: {
        favoriteKeys: this.favoriteKeys,
        getFavorites: this.getFavorites,
        setFavorites: this.setFavorites,
        addItemToFavorites: this.addItemToFavorites,
        removeItemFromFavorites: this.removeItemFromFavorites,
        // TODO: Clean this up -- pretty messy
        getCompressedFavorites: () => {
          return getCompressedObject(this.wrapFavoriteKeys(this.favoriteKeys));
        }
      }
    };
  }

  getFavorites = () => {
    const favorites = localStorage.getItem(FAVORITE_KEY);
    return !!favorites
      ? this.unwrapFavoriteKeys(getDecompressedObject(favorites))
      : [];
  };

  // This is to make it so we can have versions of the
  // favorite keys objects that get saved to local storage and shared
  // we are basically hardcoding this all to version: 0 for now
  // because I do think we will want to change some things moving forward.
  wrapFavoriteKeys = favoriteKeys => {
    return {
      version: 0,
      favoriteKeys
    };
  };

  unwrapFavoriteKeys = obj => {
    return obj.favoriteKeys;
  };

  setFavorites = () => {
    const wrapped = this.wrapFavoriteKeys(this.favoriteKeys);
    return localStorage.setItem(FAVORITE_KEY, getCompressedObject(wrapped));
  };

  addItemToFavorites = itemKey => {
    this.favoriteKeys.push(itemKey);
    this.setFavorites();
  };

  removeItemFromFavorites = itemKey => {
    // TODO: Make better
    const items = this.favoriteKeys.filter(item => item !== itemKey);
    this.favoriteKeys = items;
    this.setFavorites();
  };

  loadData = key => {
    // TODO: this is a pretty ugly check -- no-op if key is invalid
    if (
      key !== "upcoming" &&
      Object.keys(this.metadataLookup).indexOf(key) < 0
    ) {
      return;
    }

    // set state and return if we already have this data
    if (this.data[key]) {
      this.setState({ dataType: key, additionalFilter: "" });
      return;
    }

    // load the data if we don't have it already and update the dataType
    axios.get(this.metadataLookup[key].path).then(response => {
      this.data[key] = response.data;
      this.setState({ dataType: key, additionalFilter: "" });
    });
  };

  // TODO: Don't really dig this so much
  // this branches based on what is calling the change
  // it's either a filter or it says load new data
  onChangeFilter = filter => {
    let additionalStates = {};
    if (filter !== "dates") {
      additionalStates = { startDate: undefined, endDate: undefined };
    }
    if (filter === this.state.additionalFilter) {
      return;
    }

    this.setState(previousState => {
      return filter === "openCfps"
        ? {
            additionalFilter: filter,
            dataType: "upcoming",
            ...additionalStates
          }
        : {
            additionalFilter: filter,
            ...additionalStates
          };
    });
  };

  onToggleForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm,
      showShare: false
    }));
  };

  onToggleShare = () => {
    this.setState(prevState => ({
      showShare: !prevState.showShare,
      showForm: false
    }));
  };

  getSharedTitle = () => {
    const { isShared, title } = this.props;

    if (isShared) {
      return (
        <h2>
          {getDecompressedObject(title)} <span>(shared)</span>
        </h2>
      );
    }
  };

  getData = () => {
    const { dataType, additionalFilter, startDate, endDate } = this.state;
    const { isShared, list } = this.props;

    if (isShared) {
      const items = this.unwrapFavoriteKeys(getDecompressedObject(list));
      return conferences.filter(
        conference => items.indexOf(conference.key) >= 0
      );
    }

    const data = this.data[dataType];
    switch (additionalFilter) {
      case "openCfps":
        return conferences.filter(
          conference =>
            conference.cfpEndDate &&
            conference.cfpEndDate > moment().toISOString()
        );
      case "myRadar":
        return conferences.filter(
          conference => this.favoriteKeys.indexOf(conference.key) >= 0
        );
      case "dates":
        return conferences.filter(
          conference =>
            conference.eventStartDate > this.state.startDate &&
            conference.eventEndDate < this.state.endDate
        );
      case status.cancelled:
        return conferences.filter(
          conference => conference.status === status.cancelled
        );
      case status.happening:
        return conferences.filter(
          conference => conference.status === status.happening
        );
      case status.online:
        return conferences.filter(
          conference => conference.status === status.online
        );
      case status.noInfo:
        return conferences.filter(
          conference => conference.status === status.noInfo
        );
      case status.postponed:
        return conferences.filter(
          conference => conference.status === status.postponed
        );
      default:
        return data;
    }
  };

  setDates = (startDate, endDate) => {
    this.setState({ startDate, endDate, additionalFilter: "dates" });
  };

  render() {
    const data = this.getData();
    const sharedTitle = this.getSharedTitle();
    return (
      <div>
        <Header>
          <h1>Conference Radar</h1>
          <div style={{ textAlign: "right" }}>
            <p>Know of a conference not listed? Notice an issue?</p>
            <div>
              <button onClick={this.onToggleForm} className={`addEvent button`}>
                {this.state.showForm ? "Back to list" : "Add Event"}
              </button>
            </div>
          </div>
        </Header>
        {this.props.isShared ? (
          <SharedHeadingWrapper>
            <Link to="/">Back to all listings</Link>
            {sharedTitle}
          </SharedHeadingWrapper>
        ) : (
          <ButtonGroup
            onChangeFilter={this.onChangeFilter}
            onChangeData={this.loadData}
            items={this.metadataKeys}
            selectedDropdownItem={this.state.dataType}
            selectedTab={this.state.additionalFilter || "main"}
            toggleForm={this.onToggleForm}
            toggleShare={this.onToggleShare}
            isMobile={isMobileish()}
            showShare={this.state.showShare}
            showForm={this.state.showForm}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            setDates={this.setDates}
          />
        )}
        {this.state.showForm && <Add />}
        {!isMobileish() && this.state.showShare && <Share />}
        {!this.state.showForm && <DetailsSection data={data} />}
        <Footer>
          <FooterLeft>
            For more information on the Coronavirus/COVID-19,{" "}
            <a href="https://www.who.int/health-topics/coronavirus">
              please visit the World Health Organization's official page
            </a>
            . <br />
            Please also consider{" "}
            <a
              href="https://donate.doctorswithoutborders.org/onetime.cfm"
              target="_blank"
            >
              donating to Doctors Without Borders
            </a>
            .
          </FooterLeft>
          <FooterMiddle>
            <AdWrapper>
              <a
                href="https://fistbumpsonly.com/?source=conferenceradar"
                target="_blank"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/0339/3699/8537/files/FBO-Circular-Ad-240sq.png?v=1583425150"
                  width="80px"
                  height="auto"
                />
              </a>
              <small>
                <a
                  href="https://fistbumpsonly.com/?source=conferenceradar"
                  target="_blank"
                >
                  FIST BUMPS ONLY™ <br />
                  Better than a handshake. Pins, shirts, and more.
                </a>
              </small>
            </AdWrapper>
          </FooterMiddle>
          <FooterRight>
            <small>
              This is a community maintained site/list provided as-is without
              guarantee or warranty. If you notice an issue or innacuracy,
              please{" "}
              <a href="https://github.com/conferenceradar/list">
                file an issue/PR on GitHub
              </a>
              .
            </small>
          </FooterRight>
        </Footer>
      </div>
    );
  }
}

export default App;
