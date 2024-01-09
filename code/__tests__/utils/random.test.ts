import UsersInterface from 'src/types/mockData';
import getRandomString, { createRandomData } from 'src/utils/random';

describe('getRandomString function', () => {
  it('should generate a random string of the specified length', () => {
    const result = getRandomString(10);
    expect(result).toHaveLength(10);
  });

  it('should generate different strings on multiple calls', () => {
    const result1 = getRandomString(5);
    const result2 = getRandomString(5);
    expect(result1).not.toEqual(result2);
  });
});

describe('createRandomData function', () => {
  it('should create a random user data object', () => {
    const id = 1;
    const result: UsersInterface = createRandomData(id);

    expect(result).toHaveProperty('id', id);
    expect(result).toHaveProperty('company');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('surname');
    expect(result).toHaveProperty('occupation');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('dashboards');
    expect(Array.isArray(result.dashboardList)).toBe(true);
  });

  it('should create user data with a different ID', () => {
    const result1: UsersInterface = createRandomData(1);
    const result2: UsersInterface = createRandomData(2);
    expect(result1.id).not.toEqual(result2.id);
  });

  it('should create user data with valid email format', () => {
    const result: UsersInterface = createRandomData(1);
    expect(result.email).toMatch(/^\S+@\S+\.\S+$/);
  });
});
