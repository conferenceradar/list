import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import geocoder from 'geocoder';
import { mapKey } from './settings';
import fileDownload from 'js-file-download';

const AddWrapper = styled.div`
  p {
    padding: 20px 40px 10px 40px;
  }
`
const LayoutWrapper = styled.div`
  width: 80%;
  display: flex;
  padding: 20px;
  margin-bottom: 100px;
`;

const Left = styled.div`
  width: 50%;
`;
const Right = styled.div`
  padding-left: 15px;
  padding-top: 20px;
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-width: 400px;
`

const Button = styled.button`
  margin: 10px 0 10px 0;
`

function getDateString(date) {
  try {
    return date ?
    moment(date).toISOString() :
    ''
  } catch(e) {
    return ''
  }
}

export default class Form extends React.Component {
  state = { outputText: '' }

  getRef = (itemName) => (item) => { this[itemName] = item };
  onClick = () => {
    const {
      name,
      topic,
      url,
      twitter,
      city,
      stateProvince,
      country,
      eventStartDate,
      eventEndDate,
      status,
      statusUrl,
      industry
    } = this;

    const obj = {
      name: name.value,
      url: url.value,
      twitter: twitter.value,
      city: city.value,
      stateProvince: stateProvince.value,
      country: country.value,
      eventStartDate: getDateString(eventStartDate.value),
      eventEndDate: getDateString(eventEndDate.value),
      status: status.value,
      statusUrl: statusUrl.value,
      industry: industry.value,
      codeOfConduct: '',
    }

    if(!obj.city && !obj.stateProvince && !obj.country) {
      this.setState({ outputText: JSON.stringify(obj, null, '  ')});
      return;
    }

    geocoder.geocode(`${obj.city} ${obj.stateProvince} ${obj.country}`, ( err, data ) => {
      if(err) {
        this.setState({ outputText: JSON.stringify(obj, null, '  ')});
        return;
      }

      const newObject = {
        ...obj,
        latitude: data.results[0].geometry.location.lat,
        longitude: data.results[0].geometry.location.lng,
      }
      this.setState({ outputText: JSON.stringify(newObject, null, '  ')});
    }, { key: mapKey });
  }
  saveJSON = () => {
    fileDownload(this.state.outputText, 'event.json');
  }
  render() {
    return (
      <AddWrapper>
      <p>
        The data in this application exists in 
         <a href="https://github.com/conferenceradar/list/blob/master/src/events" target="_blank" rel="noopener noreferrer"> a series of JSON files </a>
        This form exists in order to make the process of editing records in this json file easier. Update this form and click generate -- from there you can copy the item from the text area on the right and update 
        <a href="https://github.com/conferenceradar/list/blob/master/src/events.json" target="_blank" rel="noopener noreferrer"> events </a> 
        and <a href="https://github.com/conferenceradar/list" target="_blank" rel="noopener noreferrer"> submit an issue or PR </a>.
      </p>

      <LayoutWrapper>
      <Left>
        <label>
          Name
          <input className="input" name='name' ref={this.getRef('name')} />
        </label>
        <label>
          Url
          <input className="input" name='url' ref={this.getRef('url')} />
        </label>
        <label>
          Twitter
          <input className="input" name='twitter' ref={this.getRef('twitter')} />
        </label>
        <label>
          Industry
          <input className="input" name="industry" ref={this.getRef('industry')} placeholder="(e.g. tech)" />
        </label>
        <label>
          City
          <input className="input" name='city' ref={this.getRef('city')} />
        </label>
        <label>
          State/Province
          <input className="input" name='stateProvince' ref={this.getRef('stateProvince')} />
        </label>
        <label>
          Country
          <input className="input" name='country' ref={this.getRef('country')} />
        </label>
        <label>
          Start Date
          <input className="input" name='eventStartDate' ref={this.getRef('eventStartDate')} />
        </label>
        <label>
          End Date
          <input className="input" name='eventEndDate' ref={this.getRef('eventEndDate')} />
        </label>
        <div style={{ padding: '12px 0'}}>
        <label>
          Status
          <select className="select" name='status' ref={this.getRef('status')} style={{ marginLeft: 12}}>
            <option value="cancelled">Cancelled</option>
            <option value="postponed">Postponed</option>
            <option value="happening">Happening</option> 
            <option value="noInfo">No Updates Provided</option> 
          </select>
        </label>
        </div>
        <label>
          Official status URL
          <input className="input" name='statusUrl' ref={this.getRef('statusUrl')} />
        </label>
        <Button className="button" onClick={this.onClick}>Generate</Button>
        </Left>
        <Right>
          <TextArea className="textArea" type="text" value={this.state.outputText} rows="20"/>
          <Button className="button" onClick={this.saveJSON}>Save As...</Button>
        </Right>
      </LayoutWrapper>
      </AddWrapper>
    );
  }
}
