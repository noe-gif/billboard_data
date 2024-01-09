'use client';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import MENU_TABS from 'src/routes/__backoffice__/paths';
import tabsStyling from 'src/theme/overrides/__backoffice__/backoffice-view-styling';

// ----------------------------------------------------------------------

type BackofficeNavigatorProps = {
  currentTab: string;
  handleChangeTab: (event: React.SyntheticEvent, newValue: string) => void;
};

export default function BackofficeNavigator({
  currentTab,
  handleChangeTab,
}: BackofficeNavigatorProps) {
  return (
    <Tabs value={currentTab} onChange={handleChangeTab} sx={tabsStyling}>
      {MENU_TABS.map((tab) => (
        <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
      ))}
    </Tabs>
  );
}
