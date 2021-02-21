import { Moment } from 'moment';
import { Day } from '../entities/Day';

export const getDaysInMonth = (currentMoment: Moment): Day[] => {
  const currentDate = currentMoment.clone();
  const days: Day[] = [];
  const firstDay = currentDate.clone().startOf('month').format('d');
  for (let day = 0; day < +firstDay; day++)
    days.push({
      day,
      isCurrentMonth: false,
      date: '',
    });

  let lastMonthDays = currentDate.clone().subtract(1, 'month').daysInMonth();
  for (const [index] of days.entries()) {
    days.splice(index, 1, {
      isCurrentMonth: false,
      day: lastMonthDays,
      date: currentDate
        .clone()
        .startOf('month')
        .subtract(1, 'month')
        .add(lastMonthDays, 'day')
        .subtract(1, 'day')
        .format('YYYY-MM-DD'),
    });
    lastMonthDays = lastMonthDays - 1;
  }
  days.reverse();

  for (let day = 1; day <= currentDate.clone().daysInMonth(); day++)
    days.push({
      day,
      isCurrentMonth: true,
      date: currentDate.clone().startOf('month').subtract(1, 'day').add(day, 'day').format('YYYY-MM-DD'),
    });

  const lastDay = currentDate.clone().endOf('month').format('d');
  for (let day = 6; day > +lastDay; day--)
    days.push({
      day: Math.abs(7 - day),
      isCurrentMonth: false,
      date: currentDate
        .clone()
        .startOf('month')
        .subtract(1, 'day')
        .add(1, 'month')
        .add(Math.abs(7 - day), 'day')
        .format('YYYY-MM-DD'),
    });
  console.log(days);
  return days;
};
