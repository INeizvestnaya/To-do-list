import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectAllTasks,
  selectDay as daySelector
} from '../../redux/selectors';
import { setDay } from '../../redux/TasksSlice';
import TasksBadge from '../TasksBadge/TasksBadge';
import { StyledTypography } from './components';
import classes from './DaysTable.module.css';

const getYesterday = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const renderMonth = (lastShownDay) => {
  const monthDays = [];

  const newDay = new Date(lastShownDay);
  newDay.setDate(newDay.getDate() + 1);

  const newMonth = newDay.getMonth();

  while (newDay.getMonth() === newMonth) {
    monthDays.push(new Date(newDay));
    newDay.setDate(newDay.getDate() + 1);
  }

  return monthDays;
};

const DaysTable = () => {
  const dispatch = useDispatch();

  const selectedDay = useSelector(daySelector);
  const tasks = useSelector(selectAllTasks);

  const [days, setDays] = useState(renderMonth(getYesterday()));

  useEffect(() => {
    const dayParts = selectedDay.split('.');
    const selected = new Date(dayParts[2], dayParts[1] - 1, dayParts[0]);

    if (selected > days.at(-1)) {
      setDays((prevState) => {
        let newDays = [...prevState];
        while (selected > newDays.at(-1)) {
          newDays = [...newDays, ...renderMonth(newDays.at(-1))];
        }
        return newDays;
      });
    }
  }, [selectedDay, days]);

  const selectDay = (day) => {
    dispatch(setDay({ day: day.toLocaleDateString() }));
  };

  const isToday = (day) =>
    day.toLocaleDateString() === new Date().toLocaleDateString();

  const scrollHandler = ({ target }) => {
    if (target.scrollWidth - target.scrollLeft - target.clientWidth < 1) {
      const lastShownDay = days.at(-1);
      const newMonth = renderMonth(lastShownDay);
      setDays((prevState) => [...prevState, ...newMonth]);
    }
  };

  const getDayInfo = (day) => {
    const dayTasks = tasks[day.toLocaleDateString()];
    let done = false;
    let undone = false;
    if (dayTasks) {
      done = !!Object.values(dayTasks).find((task) => task.done);
      undone = !!Object.values(dayTasks).find((task) => !task.done);
    }

    const selected = day.toLocaleDateString() === selectedDay;

    return { done, undone, selected };
  };

  const getDayLabels = (day) => [
    day.toDateString().slice(0, 4),
    day.getDate(),
    months[day.getMonth()],
    day.getFullYear()
  ];

  return (
    <TableContainer onScroll={scrollHandler}>
      <Table aria-label="simple table" className={classes.table}>
        <TableBody>
          <TableRow>
            {days.map((day) => {
              const { done, undone, selected } = getDayInfo(day);

              return (
                <TableCell key={day} className={classes.cell}>
                  <Card
                    variant="outlined"
                    className={classes.card}
                    sx={{
                      border: selected ? 3 : 1,
                      borderColor: selected ? 'primary.main' : 'black',
                      backgroundColor: isToday(day) ? 'lightgrey' : 'white'
                    }}
                    onClick={() => selectDay(day)}
                  >
                    <CardContent>
                      {getDayLabels(day).map((label) => (
                        <StyledTypography
                          key={label}
                          color={selected ? 'primary' : 'black'}
                          selected={selected ? 'selected' : undefined}
                        >
                          {label}
                        </StyledTypography>
                      ))}
                    </CardContent>
                  </Card>
                  <TasksBadge left display={done} />
                  <TasksBadge dark display={undone} />
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DaysTable;
