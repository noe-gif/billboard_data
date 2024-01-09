import Data from 'src/types/mockData';

import getMockedDashboardData, { createData, getMockedUsersData } from 'src/utils/mockData';

describe('getMockedDashboardData function', () => {
  it('should create an array of 20 dashboard data', () => {
    const result = getMockedDashboardData();
    expect(result).toHaveLength(20);
  });

  it('should create dashboard data objects with expected properties', () => {
    const [first] = getMockedDashboardData();
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('dashboard');
    expect(first).toHaveProperty('status');
    expect(first).toHaveProperty('compare');
    expect(first).toHaveProperty('pilot');
    expect(first).toHaveProperty('contacts');
  });

  it('should generate different data on multiple calls', () => {
    const result1 = getMockedDashboardData();
    const result2 = getMockedDashboardData();
    expect(result1).not.toEqual(result2);
  });
});

describe('getMockedUsersData function', () => {
  it('should create an array of 19 user data objects', () => {
    const result = getMockedUsersData();
    expect(result).toHaveLength(19);
  });
});

describe('createData function', () => {
  it('should create a user data object with given input', () => {
    const id = 1;
    const dashboardList = [{ id: 1, name: 'Test Dashboard' }];
    const result: Data = createData(
      id,
      'Company',
      'John',
      'Doe',
      'Developer',
      'test@example.com',
      3,
      dashboardList
    );

    expect(result).toHaveProperty('id', id);
    expect(result).toHaveProperty('company', 'Company');
    expect(result).toHaveProperty('name', 'John');
    expect(result).toHaveProperty('surname', 'Doe');
    expect(result).toHaveProperty('occupation', 'Developer');
    expect(result).toHaveProperty('email', 'test@example.com');
    expect(result).toHaveProperty('dashboards', 3);
    expect(result).toHaveProperty('dashboardList', dashboardList);
  });
});
