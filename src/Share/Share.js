import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { SmallParagraph, InlineInput, InlineLabel, ShareWrapper, CopyIconWrapper } from '../styles';
import { getCompressedObject, getDecompressedObject } from '../utils/compressionUtils'
export default class Share extends Component {
  titleElement;

  state = { title: 'My Radar' }

  getCopyValue = () => {
    const { title } = this.state;
    const { favorites: { getCompressedFavorites }} = this.props;

    return `https://www.conferenceradar.com/shared/${getCompressedObject(title)}/${getCompressedFavorites()}`
  }

  onTitleChange = ({target: {value: title}}) => {
    this.setState({ title })
  }

  render() {
    const copyValue = this.getCopyValue();

    return (
      <ShareWrapper>
        <div>
          <InlineLabel>
            <span>
              Name
            </span>
            <input onChange={this.onTitleChange} placeholder='e.g. My awesome radar' ref={this.getTitleRef} className="input" />
            <CopyToClipboard text={copyValue}>
              <button className="button">
                <CopyIconWrapper className="icon">
                  <i className="fa fa-clipboard fa-1" aria-hidden="true"></i>
                </CopyIconWrapper>
                Copy
              </button>
            </CopyToClipboard>
          </InlineLabel>
        </div>
        <div>
          <SmallParagraph>
            This builds a shareable link to ConferenceRadar. This is a simple version of sharing for now and will only
            work against upcoming events.
          </SmallParagraph>
          <SmallParagraph>
            Additionally, the links contain the drive the state of the list. This means that since we are not currently 
            using a database, any items added to "Your Radar" after sending will only show up for you and not folks that are
            recipients of your list. You can share your list at a later time with updated information.
          </SmallParagraph>
        </div>
      </ShareWrapper>
    )
  }
}
