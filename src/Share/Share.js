import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { SmallParagraph, InlineLabel, ShareWrapper, CopyIconWrapper } from '../styles';
import { getCompressedObject } from '../utils/compressionUtils'
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
            This builds a shareable link to ConferenceRadar. This is a point-in-time link and will not update as you add more items to your radar.
          </SmallParagraph>
        </div>
      </ShareWrapper>
    )
  }
}
