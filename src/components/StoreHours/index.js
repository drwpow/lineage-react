import React from 'react';

import Styled from './styles';

const locations = [
  {
    name: 'East End Market',
    opening: 20130901,
    militaryHours: [
      [10, 18], [8, 19], [8, 19], [8, 19], [8, 19], [8, 19], [8, 19],
    ],
  },
  {
    name: 'Mills/50',
    opening: 20180001,
    militaryHours: [
      [10, 18], [8, 19], [8, 19], [8, 19], [8, 19], [8, 19], [8, 19],
    ],
  },
];

const format = (hours) => {
  if (hours === 12) {
    return `${hours}p`;
  } else if (hours >= 13) {
    return `${hours - 12}p`;
  }
  return `${hours}a`;
};

const today = new Date();
const offsetMin = today.getTimezoneOffset();
const offsetHours = offsetMin / 60;
let day = Math.floor(today.getUTCDay() - offsetHours / 24);
day = day < 0 ? 6 : (day >= 7 ? 0 : day);

const isOpen = (location) => {
  let hours = today.getUTCHours() - offsetHours; // can be > 24; makes late-night closing calculations and timezones simpler
  hours = hours < 0 ? hours + 24 : hours;
  let minutes = today.getUTCMinutes();
  minutes = minutes < 0 ? minutes + 60 : minutes;

  // Check if location opened
  const month = today.getUTCMonth() < 9 ? `0${today.getUTCMonth() + 1}` : today.getUTCMonth() + 1;
  const date = today.getUTCDate() < 10 ? `0${today.getUTCDate()}` : today.getUTCDate();
  if (parseInt(`${today.getUTCFullYear()}${month}${date}`, 10) < location.opening) {
    return 'Opening Soon';
  }
  // Return closing soon if within 30 min
  let open = location.militaryHours[day][0];
  open = open < 0 ? open + 24 : open;
  let close = location.militaryHours[day][1];
  close = close < 0 ? close + 24 : close;

  if ((hours + minutes / 60) >= (close - 0.5) && hours < close) {
    return 'Closing Soon';
  } else if (hours >= open && hours < close) {
    return 'Open';
  }
  return 'Closed';
};

const StoreHours = () => (
  <Styled.Container>
    <Styled.Heading>Locations</Styled.Heading>
    <Styled.Grid>
      {locations.map((location) => {
        const status = isOpen(location);
        return (
          <Styled.Location key={location.name}>
            <Styled.LocationName>{location.name}</Styled.LocationName>
            <Styled.Status status={status}>{status}</Styled.Status>
            {status !== 'Opening Soon' &&
              <div>
                <Styled.Hours isToday={day > 1 && day < 6}>
                  <Styled.Days>M–F</Styled.Days>
                  <Styled.Range>{format(location.militaryHours[1][0])} – {format(location.militaryHours[1][1])}</Styled.Range>
                </Styled.Hours>
                <Styled.Hours isToday={day === 6}>
                  <Styled.Days>Sat</Styled.Days>
                  <Styled.Range>{format(location.militaryHours[6][0])} – {format(location.militaryHours[6][1])}</Styled.Range>
                </Styled.Hours>
                <Styled.Hours isToday={day === 0}>
                  <Styled.Days>Sun</Styled.Days>
                  <Styled.Range>{format(location.militaryHours[0][0])} – {format(location.militaryHours[0][1])}</Styled.Range>
                </Styled.Hours>
              </div>
            }
          </Styled.Location>
        );
      })}
    </Styled.Grid>
  </Styled.Container>
);

export default StoreHours;