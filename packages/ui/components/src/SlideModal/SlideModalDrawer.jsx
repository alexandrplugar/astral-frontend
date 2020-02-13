import PropTypes from 'prop-types';
import React from 'react';

import { makeStyles } from '@astral-frontend/styles';

import Drawer from '../Drawer';

const useStyles = makeStyles(
  theme => {
    const getWidth = ({ size }) => {
      switch (size) {
        case 'small':
          return '40%';
        case 'medium':
          return '60%';
        case 'large':
          return '80%';
        default:
          return null;
      }
    };

    return {
      paper: {
        width: getWidth,
        boxShadow: theme.shadows[2],
        borderLeft: 'none',
      },
    };
  },
  { name: 'SlideModalDrawer' },
);

const SlideModalDrawer = props => {
  const { size, children, ...restProps } = props;
  const classes = useStyles({ size });

  return (
    <Drawer {...restProps} classes={classes}>
      {children}
    </Drawer>
  );
};

SlideModalDrawer.defaultProps = {
  size: 'medium',
  anchor: 'right',
  transitionDuration: { enter: 400, exit: 250 },
};

SlideModalDrawer.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  transitionDuration: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
};

export default SlideModalDrawer;
