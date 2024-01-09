import UsersInterface from 'src/types/mockData';

const getRandomString = (length: number): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

export const createRandomData = (id: number): UsersInterface => {
  const numberOfDashboards = Math.floor(Math.random() * 10);
  return {
    id,
    company: getRandomString(8),
    name: getRandomString(5),
    surname: getRandomString(7),
    occupation: getRandomString(10),
    email: getRandomString(10) + '@example.com',
    dashboards: numberOfDashboards,
    dashboardList: Array.from({ length: numberOfDashboards }, (_, index) => ({
      id: index + 1,
      name: getRandomString(8),
    })),
  };
};

export default getRandomString;
