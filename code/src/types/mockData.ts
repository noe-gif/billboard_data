export default interface UsersInterface {
  id: number;
  company: string;
  name: string;
  surname: string;
  occupation: string;
  email: string;
  dashboards: number;
  dashboardList: { id: number; name: string }[];
}
