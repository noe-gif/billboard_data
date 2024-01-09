import { tabsClasses } from '@mui/material/Tabs';

const tabsStyling = {
  width: 1,
  pb: 2,
  textTransform: 'uppercase',
  [`& .${tabsClasses.flexContainer}`]: {
    pr: { md: 3 },
    justifyContent: {
      sm: 'center',
      md: 'flex-start',
    },
  },
};

export const containerStyle = {
  padding: 0,
  p: 0,
};

export const customBreadcrumbsStyle = {
  mb: { xs: 3, md: 2 },
};

export default tabsStyling;
