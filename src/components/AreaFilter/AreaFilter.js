import React from 'react';
import { bool } from 'prop-types';
import AreaFilterPlain from './AreaFilterPlain';
import AreaFilterPopup from './AreaFilterPopup';

const AreaFilter = props => {
  const { showAsPopup, ...rest } = props;
  return showAsPopup ? <AreaFilterPopup {...rest} /> : <AreaFilterPlain {...rest} />;
 
};

AreaFilter.defaultProps = {
  showAsPopup: false,
};

AreaFilter.propTypes = {
  showAsPopup: bool,
};

export default AreaFilter;
