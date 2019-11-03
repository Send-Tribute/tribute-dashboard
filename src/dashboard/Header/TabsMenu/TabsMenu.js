import React, { useContext } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { Context } from '../../context';
import { TABS } from '../../helpers/constants';
import Icon from '../../general/Icon';

export default function TabsMenu() {
  const [context, setContext] = useContext(Context);
  const { selectedTab } = context;
  const handleTabChange = (event, tab) => {
    setContext({ ...context, selectedTab: TABS.ordering[tab] });
  };

  const getTabs = () =>
    TABS.ordering.map((tab, index) => (
      // return <Tab label={tab} icon={TABS.icons[0]} />;
      <Tab
        label={tab}
        key={`${index + index}`}
        icon={<Icon name={TABS.icons[tab]} />}
      />
    ));

  const currentTab =
    selectedTab !== undefined
      ? TABS.ordering.indexOf(selectedTab)
      : TABS.ordering.indexOf(TABS.default);

  return (
    <Tabs variant="fullWidth" value={currentTab} onChange={handleTabChange}>
      {getTabs()}
    </Tabs>
  );
}
