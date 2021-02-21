import { makeStyles } from '@material-ui/core/styles';
// import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import { utc as moment } from 'moment';
import React from 'react';
import Calendar from '../../components/Calendar';

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  header: {
    justifyContent: 'space-between',
    display: 'flex',
    background: '#f34c4c',
    color: '#ffffff',
    borderRadius: '5px 5px 0 0',
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    fontWeight: 400,
    lineHeight: '1.43',
    letterSpacing: '0.01071em',
    padding: 16,
    fontSize: '0.875rem',
    textAlign: 'left',
  },
});

const Home = () => {
  const classes = useStyles();

  const [currentMonth] = React.useState(moment().month());
  // const [currentMonthDescription, setCurrentMonthDescription] = React.useState<string>();
  // const [currentYear, setCurrentYear] = React.useState<string>();

  React.useEffect(() => {
    // const innerDate = moment().startOf('year').subtract(1, 'week').add(currentMonth, 'month').add(2, 'week');
    // setCurrentMonthDescription(innerDate.format('MMMM'));
    // setCurrentYear(innerDate.format('YYYY'));
  }, [currentMonth]);

  return (
    <div className={classes.container}>
      {/* <div className={classes.header}>
        <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => setCurrentMonth(currentMonth - 1)} />
        {currentMonthDescription} - {currentYear}
        <ArrowForwardIcon style={{ cursor: 'pointer' }} onClick={() => setCurrentMonth(currentMonth + 1)} />
      </div> */}
      <Calendar {...{ currentMonth }} />
    </div>
  );
};

export default Home;
