import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {
  ContentState,
  List,
  InfiniteList,
  Placeholder,
} from '@astral-frontend/components';
import { makeStyles } from '@astral-frontend/styles';

import DataListHeader from './DataListHeader';
import { __Context as DataListItemContext } from '../DataListItem';

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    list: {
      height: '100%',
      paddingTop: 0,
      paddingBottom: 0,
      overflowY: 'auto',
    },
    row: {
      display: 'grid',
      gridGap: theme.spacing(2),
      gridTemplateColumns: props => {
        return `${props.columns
          .map(column => `${column.fr || '1'}fr`)
          .join(' ')}`;
      },
    },
    bodyRow: {
      position: 'relative',
      marginBottom: theme.spacing(1),
      '&:hover $rowActions': {
        opacity: 1,
      },
    },
    dataItem: {
      borderStyle: 'solid',
      borderColor: 'transparent',
      padding: theme.spacing(4, 0),
      marginBottom: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.gray[800],
      background: theme.palette.common.white,
    },
    rowActions: {
      opacity: 0,
      transition: theme.transitions.create(['opacity']),
    },
  }),
  { name: 'DataList' },
);

const DataList = ({
  loading,
  error,
  data,
  ListItemComponent,
  RowActionsComponent,
  EmptyStateComponent,
  onLoadMoreItems,
  ...props
}) => {
  const { columns } = props;
  const classes = useStyles(props);

  if (error) {
    return <Placeholder state="failure" error={error} />;
  }

  // if (loading) {
  //   return <Placeholder state="loading" />;
  // }

  if (!loading && data.length === 0) {
    return <EmptyStateComponent />;
  }

  return (
    <div className={classes.root}>
      <DataListHeader className={classes.row} columns={columns} />
      <InfiniteList
        itemCount={data.length}
        itemsRenderer={(items, ref) => (
          <List className={classes.list} ref={ref}>
            {items}
          </List>
        )}
        renderItem={(index, key) => {
          const dataItem = data[index];

          return (
            <li key={key} className={classes.bodyRow}>
              <DataListItemContext.Provider value={dataItem}>
                <ListItemComponent
                  className={cn(classes.row)}
                  loading={loading}
                  error={error}
                  data={dataItem}
                >
                  {columns.map(column => {
                    const Component = column.component;

                    return (
                      <Component
                        key={column.title}
                        loading={loading}
                        error={error}
                        data={dataItem}
                      />
                    );
                  })}
                </ListItemComponent>
              </DataListItemContext.Provider>
              {RowActionsComponent && (
                <RowActionsComponent
                  className={classes.rowActions}
                  data={dataItem}
                />
              )}
            </li>
          );
        }}
        onIntersection={onLoadMoreItems}
        {...props}
      />
    </div>
  );
};

DataList.defaultProps = {
  error: null,
  ListItemComponent: null,
  RowActionsComponent: null,
  onLoadMoreItems: null,
};

DataList.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Error),
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
    }),
  ).isRequired,
  ListItemComponent: PropTypes.func,
  RowActionsComponent: PropTypes.func,
  EmptyStateComponent: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  onLoadMoreItems: PropTypes.func,
};

export default DataList;
