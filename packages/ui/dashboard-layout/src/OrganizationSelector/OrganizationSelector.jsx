import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Popper, Grow, Paper, ClickAwayListener, MenuList,
} from '@astral-frontend/components';

import { withStyles } from '@astral-frontend/styles';
import CurrentOrganization from './OrganizationSelectorCurrentOrganization';
import OrganizationSelectorItem from './OrganizationSelectorItem';
import OrganizationSelectorNotFoundPlaceholder from './OrganizationSelectorNotFoundPlaceholder';

const DashboardLayoutOrganizationSelector = ({
  classes,
  className,
  children,
  currentOrganization,
  NotFoundPlaceholder,
}) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleTogglerButtonClick = (event) => {
    const { currentTarget } = event;

    setOpen(prevValue => !prevValue);
    setAnchorEl(currentTarget);
  };

  const handleClickAwayListenerClickAway = () => {
    setOpen(false);
  };

  return (
    <div className={cn(classes.root, className)}>
      <CurrentOrganization
        name={currentOrganization && currentOrganization.name}
        onClick={handleTogglerButtonClick}
      />
      <Popper transition open={open} anchorEl={anchorEl} onClick={() => setOpen(false)}>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper className={classes.popperPaper}>
              <ClickAwayListener onClickAway={handleClickAwayListenerClickAway}>
                {children.length > 0 ? <MenuList>{children}</MenuList> : <NotFoundPlaceholder />}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
DashboardLayoutOrganizationSelector.defaultProps = {
  className: null,
};

DashboardLayoutOrganizationSelector.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  currentOrganization: PropTypes.shape({}).isRequired,
  NotFoundPlaceholder: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
    PropTypes.func.isRequired,
  ]).isRequired,
};

DashboardLayoutOrganizationSelector.Item = OrganizationSelectorItem;
DashboardLayoutOrganizationSelector.NotFoundPlaceholder = OrganizationSelectorNotFoundPlaceholder;

export default withStyles({
  root: {
    display: 'flex',
    height: '100%',
  },
})(DashboardLayoutOrganizationSelector);
