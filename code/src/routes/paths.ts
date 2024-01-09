const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  BACKOFFICE: '',
  CAMPAIGNS: '/campaigns',
};

// ----------------------------------------------------------------------

export const paths = {
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  // AUTH
  auth: {
    dashboard: {
      jwt: {
        login: `${ROOTS.AUTH}${ROOTS.DASHBOARD}/jwt/login`,
        register: `${ROOTS.AUTH}${ROOTS.DASHBOARD}/jwt/register`,
        forgotPassword: `${ROOTS.AUTH}${ROOTS.DASHBOARD}/jwt/forgot-password`,
        newPassword: `${ROOTS.AUTH}${ROOTS.DASHBOARD}/jwt/new-password`,
        verify: `${ROOTS.AUTH}${ROOTS.DASHBOARD}/jwt/verify`,
      },
    },
    backoffice: {
      jwt: {
        login: `${ROOTS.AUTH}${ROOTS.BACKOFFICE}/jwt/login`,
        register: `${ROOTS.AUTH}${ROOTS.BACKOFFICE}/jwt/register`,
        forgotPassword: `${ROOTS.AUTH}${ROOTS.BACKOFFICE}/jwt/forgot-password`,
        newPassword: `${ROOTS.AUTH}${ROOTS.BACKOFFICE}/jwt/new-password`,
        verify: `${ROOTS.AUTH}${ROOTS.BACKOFFICE}/jwt/verify`,
        confirmNewPassword: `${ROOTS.AUTH}${ROOTS.BACKOFFICE}/jwt/password-confirmation`,
      },
    },
  },
  backoffice: {
    root: ROOTS.BACKOFFICE,
    campaigns: `${ROOTS.BACKOFFICE}${ROOTS.CAMPAIGNS}`,
    campaignMetrics: `${ROOTS.BACKOFFICE}${ROOTS.CAMPAIGNS}/metrics`,
    campaignSimulation: `${ROOTS.BACKOFFICE}${ROOTS.CAMPAIGNS}/simulation`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
  },
};
