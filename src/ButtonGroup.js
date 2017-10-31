import React from 'react';

import { ButtonGroupWrapper, ToggleButton, DropdownWrapper, IconWrapperLarge, SecondaryButtonGroup } from './styles';

const ButtonGroup = ({
  onChangeData,
  onChangeFilter,
  selectedDropdownItem,
  selectedTab,
  toggleForm,
  isMobile,
  items,
  toggleShare,
  showShare,
  showForm
}) => {
  return (
    <ButtonGroupWrapper className="field has-addons">
      <div className="control">
        <DropdownWrapper className={`button select ${selectedTab === 'main' && 'is-primary'}`} onClick={() => onChangeFilter('')}>
          <select className='select' onChange={(e) => { onChangeData(e.target.value) }} defaultValue={selectedDropdownItem} value={selectedDropdownItem}>
            { items.map(item => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
        </DropdownWrapper>
      </div>
      <div className="control">
        <a className={`button ${selectedTab === 'openCfps' && 'is-primary'}`} onClick={() => onChangeFilter('openCfps')}>
          <span>Open CFPs</span>
        </a>
      </div>
      <div className="control">
        <a className={`button ${selectedTab === 'myRadar' && 'is-primary'}`} onClick={() => onChangeFilter('myRadar')}>
          <span>
            My Radar

            <IconWrapperLarge>
              <i className="fa fa-star-o fa-1" aria-hidden="true"></i>
            </IconWrapperLarge>
          </span>
        </a>
      </div>

      { !isMobile && (
        <SecondaryButtonGroup className="field has-addons">
          <ToggleButton onClick={toggleForm} className={`button is-small ${showForm ? 'is-primary' : ''}`}>Add Event</ToggleButton>
          <ToggleButton onClick={toggleShare} className={`button is-small ${showShare ? 'is-primary' : ''}`}>Share 'My Radar'</ToggleButton>
        </SecondaryButtonGroup>
      )}
    </ButtonGroupWrapper>
  )
}

export default ButtonGroup;
