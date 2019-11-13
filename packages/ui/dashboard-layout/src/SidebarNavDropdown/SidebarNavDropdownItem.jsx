import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { SvgIcon } from '@astral-frontend/components';
import { makeStyles } from '@astral-frontend/styles';

import SidebarNavItem from '../SidebarNavItem';
import SidebarTooltip from '../SidebarTooltip';
import LayoutContext from '../LayoutContext';

const useStyles = makeStyles(
  theme => ({
    root: {
      borderLeft: `2px solid ${theme.palette.primary.light}`,
      marginLeft: `${theme.spacing(6)}px`,
    },
    collapsedItem: {
      padding: `${theme.spacing(5)}px 0 ${theme.spacing(5)}px ${theme.spacing(
        2,
      )}px`,
    },
    active: {
      color: theme.palette.primary.main,
      borderLeft: `2px solid ${theme.palette.primary.main}`,
    },
    icon: {
      fontSize: theme.typography.pxToRem(4),
    },
    text: {
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(16),
    },
  }),
  {
    name: 'DashboardLayoutSidebarNavDropdownItem',
  },
);

const DashboardLayoutSidebarNavDropdownItemComponent = React.forwardRef(
  (componentProps, ref) => <NavLink {...componentProps} ref={ref} />,
);

const DashboardLayoutSidebarNavDropdownItem = ({
  className,
  text,
  ...props
}) => {
  const { isSidebarOpen } = React.useContext(LayoutContext);

  const Item = () => {
    const classes = useStyles();

    return (
      <li>
        <SidebarNavItem
          activeClassName={classes.active}
          className={cn(classes.root, {
            [classes.collapsedItem]: !isSidebarOpen,
          })}
          Text={textProps => (
            <div className={cn(classes.text, textProps.className)}>{text}</div>
          )}
          Icon={() => (isSidebarOpen ? null : (
            <SvgIcon viewBox="0 0 4 4" className={classes.icon}>
              <circle cx="2" cy="2" r="2" fill="currentColor" />
            </SvgIcon>
          ))
          }
          component={DashboardLayoutSidebarNavDropdownItemComponent}
          {...props}
        />
      </li>
    );
  };

  if (isSidebarOpen) {
    return <Item />;
  }
  return (
    <SidebarTooltip text={text}>
      <Item />
    </SidebarTooltip>
  );
};

DashboardLayoutSidebarNavDropdownItem.defaultProps = {
  className: null,
};

DashboardLayoutSidebarNavDropdownItem.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default DashboardLayoutSidebarNavDropdownItem;
