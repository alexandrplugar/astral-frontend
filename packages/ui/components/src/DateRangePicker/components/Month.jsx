import PropTypes from 'prop-types';
import React from 'react';
import { Paper, Grid, Typography } from '@astral-frontend/core';
import { makeStyles } from '@astral-frontend/styles';
import {
  getDate,
  isSameMonth,
  isToday,
  format,
  isWithinInterval,
} from 'date-fns';
import {
  chunks,
  getDaysInMonth,
  isStartOfRange,
  isEndOfRange,
  inDateRange,
  isRangeSameDay,
} from '../utils';
import Header from './Header';
import Day from './Day';

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const useStyles = makeStyles(() => ({
  root: {
    width: 290,
  },
  weekDaysContainer: {
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  daysContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    marginBottom: 20,
  },
}));

const Month = ({
  helpers,
  handlers,
  value: date,
  dateRange,
  marker,
  setValue: setDate,
  minDate,
  maxDate,
  weekDays = WEEK_DAYS,
  months,
  navState,
}) => {
  const classes = useStyles();
  const [back, forward] = navState;

  return (
    <Paper square elevation={0} className={classes.root}>
      <Grid container>
        <Header
          date={date}
          setDate={setDate}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() => handlers.onMonthNavigate(marker, -1)}
          onClickNext={() => handlers.onMonthNavigate(marker, 1)}
          months={months}
        />

        <Grid
          item
          container
          direction="row"
          justify="space-between"
          className={classes.weekDaysContainer}
        >
          {weekDays.map(day => (
            <Typography color="textSecondary" key={day} variant="caption">
              {day}
            </Typography>
          ))}
        </Grid>

        <Grid
          item
          container
          direction="column"
          justify="space-between"
          className={classes.daysContainer}
        >
          {chunks(getDaysInMonth(date), 7).map((week, idx) => (
            <Grid key={idx} container direction="row" justify="center">
              {week.map(day => {
                const isStart = isStartOfRange(dateRange, day);
                const isEnd = isEndOfRange(dateRange, day);
                const isRangeOneDay = isRangeSameDay(dateRange);
                const highlighted =
                  inDateRange(dateRange, day) || helpers.inHoverRange(day);

                return (
                  <Day
                    key={format(day, 'MM-dd-yyyy')}
                    filled={isStart || isEnd}
                    outlined={isToday(day)}
                    highlighted={highlighted && !isRangeOneDay}
                    disabled={
                      !isSameMonth(date, day) ||
                      !isWithinInterval(day, { start: minDate, end: maxDate })
                    }
                    startOfRange={isStart && !isRangeOneDay}
                    endOfRange={isEnd && !isRangeOneDay}
                    onClick={() => handlers.onDayClick(day)}
                    onHover={() => handlers.onDayHover(day)}
                    value={getDate(day)}
                  />
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

// Month.propTypes = {
//   value: PropTypes.instanceOf(Date).isRequired,
//   marker: PropTypes.symbol.isRequired,
//   dateRange: PropTypes.shape({
//     startDate: PropTypes.instanceOf(Date),
//     endDate: PropTypes.instanceOf(Date),
//   }).isRequired,
//   minDate: PropTypes.instanceOf(Date).isRequired,
//   maxDate: PropTypes.instanceOf(Date).isRequired,
//   navState: PropTypes.arrayOf(PropTypes.bool).isRequired,
//   setValue: PropTypes.func.isRequired,
//   helpers: {
//     inHoverRange: PropTypes.func,
//   }.isRequired,
//   handlers: {
//     onDayClick: PropTypes.func,
//     onDayHover: PropTypes.func,
//     onMonthNavigate: PropTypes.func,
//   }.isRequired,
//   weekDays: PropTypes.arrayOf(PropTypes.string),
//   months: PropTypes.arrayOf(PropTypes.string),
// };

export default Month;
