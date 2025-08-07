// DO NOT include "use client" here
import React from 'react';
import { getHomepageSections } from '@/app/services/markdownConvert';
import SectionRenderer from './SectionRenderer';

const Dashboard = async () => {
  const homepageSections = await getHomepageSections('dashboard/homepageSections.md');

  return (
    <div>
      {homepageSections.sections != null
        ? homepageSections.sections.map((section: any, idx: number) => (
          <SectionRenderer key={idx} section={section} />
        ))
        : null}
    </div>
  );
};

export default Dashboard;
