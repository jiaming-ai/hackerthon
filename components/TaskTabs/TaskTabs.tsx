'use client'

import { useRouter } from 'next/navigation';
import { Tabs } from '@mantine/core';
import { useState } from 'react';
import { IconProgress, IconSquareRoundedCheck } from '@tabler/icons-react';

export default function TaskTabs() {
const tabsData = [
    { value: 'finished', label: 'Finished', icon: <IconSquareRoundedCheck width={12}/>},
    { value: 'running', label: 'Processing', icon: <IconProgress width={12}/>},
    { value: 'failed', label: 'Failed', icon: <IconProgress width={12}/>},
    // { value: 'canceled', label: 'Canceled', icon: <IconProgress width={12}/>},
    ];
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tabsData[0].value);

  return (
    <Tabs
      value={activeTab}
      onChange={(value) => {router.push(`/tasks/${value}`); setActiveTab(value as string)}}
      className='w-88 md:w-full'
    >
      <Tabs.List>
        {tabsData.map((tab) => (
          <Tabs.Tab key={tab.value} 
          leftSection={tab.icon}
          value={tab.value}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
}