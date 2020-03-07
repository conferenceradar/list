## Conference Radar

This project was created with the goal of maintaining a community list of tech conferences.

## How to help

If you see any errors, have an event to add, or add detail to an event that is currently listed, please file an issue or pull request.

### Add Details

1. Navigate to [conferenceradar.com](http://www.conferenceradar.com) and click _Toggle 'add event' form_ to display the form to create a record.
![Add Event](https://user-images.githubusercontent.com/85041/30272256-9e799c14-96c1-11e7-92b3-a9c0bcfe952c.png)
2. Edit the form as completely as possible and click 'Generate'
![Generate Event  Record](https://user-images.githubusercontent.com/85041/30272389-4d1191f0-96c2-11e7-9e05-fd8a744456c7.png)
3. Submit an issue with the output of the form OR (_even better_) add the record as a new `myevent-name.json` file under [src/events/2020](https://github.com/conferenceradar/list/tree/master/src/events/2020) and submit a Pull Request.

##### Events structure

This application is currently based on JSON files containing conference information.

```
  {
    "name": "{{CONFERENCE NAME}}",
    "topic": "",
    "url": "{{CONFERENCE URL}}",
    "twitter": "",
    "city": "New York",
    "stateProvince": "NY",
    "country": "United States",
    "eventStartDate": "",
    "eventEndDate": "",
    "cfpStartDate": "",
    "cfpEndDate": "",
    "codeOfConduct": "",
    "latitude": 40.7127837,
    "longitude": -74.0059413,
    "industry": "tech"
  },
```

The main fields right now are: 

* **name**: Name of the conference
* **topic**: The topic of the conference
* **url**: The conference website
* **twitter**: The conference twitter handle or hashtag if no profile exists
* **city**: City
* **stateProvince**: State/Province (can be empty)
* **country**: Country
* **eventStartDate**: The Date/DateTime that this event starts (currently all dates are local — The longer term goal is for these to be UTC)
* **eventEndDate**: The Date/DateTime that this event ends
* **cfpStartDate**: The Date/DateTime that the CFP for this event starts
* **cfpEndDate**: The Date/DateTime that the CFP for this event ends
* **codeOfConduct**: Right now, this is a string for determining if an event has a code of conduct. (Perhaps switch this to a URL?)
* **latitude**: Latitude based on the event location information
* **longitude**: Longitude based on the event location information
* **industry**: The relevant industry for the conference, e.g. tech, health, manufacturing, finance, etc.

### Don't like editing JSON? 

Totally understandable! If you know of a conference or see anything missing on this list? Submit a GitHub issue using standard text :+1: This will help put this item on the radar of others!
