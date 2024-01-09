import { useCallback, useState } from 'react';

export const BackofficeViewHooks = () => {
  const [currentTab, setCurrentTab] = useState('dashboards');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return {
    currentTab,
    handleChangeTab,
  };
};
