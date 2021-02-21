import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { chunk } from 'lodash';
import { utc as moment, weekdays } from 'moment';
import React from 'react';
import { Day } from '../../core/entities/Day';
import { Holiday } from '../../core/entities/Holiday';
import { getDaysInMonth } from '../../core/utils';
import { getHolidays } from './hooks';

const useStyles = makeStyles({
  table: {
    height: '100%',
    width: '100%',
  },
  container: {
    display: 'flex',
    height: ' calc(100% - 56px)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  content: {
    height: '100%',
    overflow: 'hidden',
    'border-radius': 0,
  },
  cell: {
    width: 120,
  },
});

type OwnProps = {
  currentMonth: number;
};

const Calendar = ({ currentMonth }: OwnProps) => {
  const classes = useStyles();
  const [monthDays, setMonthDays] = React.useState<Day[][]>([]);
  const [holidays, setHolidays] = React.useState<Holiday[]>([]);

  React.useEffect(() => {
    const referenceMonth = moment().startOf('year').subtract(1, 'week').add(currentMonth, 'month').add(2, 'week');
    const innerMonthDays = getDaysInMonth(referenceMonth);
    const batches = chunk(innerMonthDays, 7);
    setMonthDays(batches);
  }, [currentMonth]);

  React.useEffect(() => {
    const referenceMonth = moment().startOf('year').subtract(1, 'week').add(currentMonth, 'month').add(2, 'week');
    getHolidays(referenceMonth.year()).then(data => setHolidays(data));
  }, [currentMonth]);

  return (
    <div className={classes.container}>
      <TableContainer component={Paper} className={classes.content}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow style={{ background: '#f34c4c' }}>
              {weekdays().map((day, index) => (
                <TableCell key={index} style={{ color: '#ffffff' }} className={classes.cell}>
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {monthDays.map((week, monthIndex) => (
              <TableRow key={monthIndex}>
                {week.map(({ isCurrentMonth, day, date }, weekIndex) => (
                  <TableCell
                    className={classes.cell}
                    key={weekIndex}
                    style={{
                      color: !isCurrentMonth ? '#808080' : '#000000',
                      border: '1px solid rgba(224, 224, 224, 1)',
                      padding: '0 0 32px 16px',
                      backgroundColor:
                        isCurrentMonth && moment().format('YYYY-MM-DD') === date
                          ? '#ff000040'
                          : !isCurrentMonth
                          ? '#e4e3e3'
                          : '#ffffff',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>{day}</div>
                      {holidays?.map(
                        (holiday, dayIndex) =>
                          holiday.date === date && (
                            <Tooltip title={holiday.localName} key={dayIndex}>
                              <div style={{ marginRight: 10 }}>
                                <PriorityHighIcon fontSize="small" />
                              </div>
                            </Tooltip>
                          ),
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Calendar;
