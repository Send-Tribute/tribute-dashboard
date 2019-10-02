import React, { useContext } from 'react';
import { Context } from '../../context';
import { TABS } from '../../helpers/general';
import { Tab, Tabs } from '@material-ui/core';

export default function TabsMenu() {
  const [context, setContext] = useContext(Context);

  const handleTabChange = (event, tab) => {
    setContext({ selectedTab: TABS.ordering[tab] });
  };

  const getTabs = () => {
    return TABS.ordering.map((tab, index) => {
      // return <Tab label={tab} icon={TABS.icons[0]} />;
      return <Tab label={tab} key={index} icon={TABS.icons[tab]} />;
    });
  };

  const currentTab =
    context.selectedTab !== undefined
      ? TABS.ordering.indexOf(context.selectedTab)
      : TABS.ordering.indexOf(TABS.default);

  return (
    <Tabs variant="fullWidth" value={currentTab} onChange={handleTabChange}>
      {getTabs()}
    </Tabs>
  );
}
