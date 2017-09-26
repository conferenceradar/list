import React from 'react';
import { ButtonGroupWrapper, ToggleButton } from './styles';

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

export default ButtonGroup;