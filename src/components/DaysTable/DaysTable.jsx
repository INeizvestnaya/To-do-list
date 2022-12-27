import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import TasksBadge from '../TasksBadge/TasksBadge';

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

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

const DaysTable = ({ selectDay, tasks }) => {
  const selectedDay = useSelector((state) => state.tasks.selectedDay);

  const [days, setDays] = useState(renderMonth(yesterday));

  const isToday = (day) =>
    day.toLocaleDateString() === new Date().toLocaleDateString();

  const scrollHandler = ({ target }) => {
    if (target.scrollWidth - target.scrollLeft - target.clientWidth < 1) {
      const lastShownDay = days.at(-1);
      const newMonth = renderMonth(lastShownDay);
      setDays((prevState) => [...prevState, ...newMonth]);
    }
  };

  return (
    <TableContainer onScroll={scrollHandler}>
      <Table aria-label="simple table" sx={{ width: 'auto' }}>
        <TableBody>
          <TableRow>
            {days.map((day) => {
              const dayTasks = tasks[day.toLocaleDateString()];
              let done = false;
              let undone = false;
              if (dayTasks) {
                done = !!Object.values(dayTasks).find((task) => task.done);
                undone = !!Object.values(dayTasks).find((task) => !task.done);
              }

              const selected = day.toLocaleDateString() === selectedDay;

              return (
                <TableCell
                  key={day}
                  sx={{
                    borderBottom: 'none',
                    textAlign: 'center'
                  }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: '25%',
                      width: '110px',
                      border: selected ? 3 : 1,
                      borderColor: selected ? 'primary.main' : 'black',
                      backgroundColor: isToday(day) ? 'lightgrey' : 'white'
                    }}
                    onClick={() => selectDay(day)}
                  >
                    <CardContent>
                      {[
                        day.toDateString().slice(0, 4),
                        day.getDate(),
                        months[day.getMonth()],
                        day.getFullYear()
                      ].map((label) => (
                        <Typography
                          key={label}
                          color={selected ? 'primary' : 'black'}
                          sx={{ fontWeight: selected ? 600 : 500 }}
                        >
                          {label}
                        </Typography>
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

DaysTable.propTypes = {
  selectDay: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  tasks: PropTypes.object.isRequired
};

export default DaysTable;
