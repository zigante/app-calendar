import Axios from 'axios';
import { Holiday } from '../../core/entities/Holiday';

export const getHolidays = (year: number) =>
  Axios.get<Holiday[]>(`https://public-holiday.p.rapidapi.com/${year}/BR`, {
    headers: {
      'X-RapidAPI-Host': 'public-holiday.p.rapidapi.com',
      'x-rapidapi-key': 'e022157532msh2f29be122ae3d39p1a92c0jsnaef812518f99',
      useQueryString: true,
    },
  }).then(({ data }) => data);
