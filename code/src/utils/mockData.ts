import Data from 'src/types/mockData';
import getRandomString, { createRandomData } from 'src/utils/random';

const getMockedDashboardData = () =>
  [...Array(20)].map((_, index) => {
    const status = (index % 2 && 'actif') || (index % 3 && 'test') || 'désactivé';

    return {
      id: Math.floor(Math.random() * 100),
      dashboard: getRandomString(8),
      status,
      compare: Math.floor(Math.random() * 100),
      pilot: Math.floor(Math.random() * 100),
      contacts: Math.floor(Math.random() * 100),
    };
  });

export const getMockedUsersData = () =>
  Array.from({ length: 19 }, (_, index) => createRandomData(index + 1));

export function createData(
  id: number,
  company: string,
  name: string,
  surname: string,
  occupation: string,
  email: string,
  dashboards: number,
  dashboardList: { id: number; name: string }[]
): Data {
  return {
    id,
    company,
    name,
    surname,
    occupation,
    email,
    dashboards,
    dashboardList,
  };
}

export default getMockedDashboardData;
