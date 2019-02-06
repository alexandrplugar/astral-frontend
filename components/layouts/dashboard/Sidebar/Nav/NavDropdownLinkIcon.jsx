import pathToRegexp from 'path-to-regexp';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import SvgIcon from '../../../../SvgIcon';

const DasshboardNavDropdownLinkIcon = ({ classes, location, to }) => (
  <SvgIcon
    viewBox="0 0 12 12"
    className={pathToRegexp(location.pathname).test(to) ? classes.filled : classes.bordered}
  >
    <circle cx="6" cy="6" r="3.75" stroke="white" strokeWidth="0.5" />
  </SvgIcon>
);

DasshboardNavDropdownLinkIcon.propTypes = {
  classes: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
  to: PropTypes.string.isRequired,
};

export default withRouter(
  withStyles({
    bordered: {
      fill: 'none',
    },
    filled: {
      fill: 'white',
    },
  })(DasshboardNavDropdownLinkIcon),
);
