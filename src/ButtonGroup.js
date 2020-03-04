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
            <select className='select' onChange={(e) => { onChangeData(e.target.value) }} defaultValue={selectedDropdownItem}>
              { items.map(item => (
                <option value={item} key={item}>{item}</option>
              ))}
            </select>
        </DropdownWrapper>
      </div>
      { !isMobile && (
        <SecondaryButtonGroup className="field has-addons">
          <ToggleButton onClick={toggleForm} className={`button is-small ${showForm ? 'is-primary' : ''}`}>Add Event</ToggleButton>
        </SecondaryButtonGroup>
      )}
    </ButtonGroupWrapper>
  )
}

export default ButtonGroup;