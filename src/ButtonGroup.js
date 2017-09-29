import React from 'react';

import { ButtonGroupWrapper, ToggleButton, DropdownWrapper } from './styles';

const ButtonGroup = ({onChangeData, onChangeFilter, selectedDropdownItem, selectedTab, toggleForm, isMobile, items}) => {
  return (
    <ButtonGroupWrapper className="field has-addons">
      <div className="control">
        <DropdownWrapper className={`button select ${selectedTab === 'main' && 'is-primary'}`} onClick={() => onChangeFilter('')}>
            <select className='select' onChange={(e) => { onChangeData(e.target.value) }}>
              { items.map(item => console.log(item) || (
                <option value={item} key={item} selected={selectedDropdownItem === item}>{item}</option>
              ))}
            </select>
        </DropdownWrapper>
      </div>
      <div className="control">
        <a className={`button ${selectedTab === 'openCfps' && 'is-primary'}`} onClick={() => onChangeFilter('openCfps')}>
          <span>Open CFPs</span>
        </a>
      </div>
      { !isMobile &&
        <ToggleButton onClick={toggleForm} className="button is-small">Toggle 'Add Event' Form</ToggleButton>
      }
    </ButtonGroupWrapper>
  )
}

export default ButtonGroup;