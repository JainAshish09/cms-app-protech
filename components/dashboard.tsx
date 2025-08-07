import React from 'react';
import { getHomepageSections } from '@/app/services/markdownConvert';
import SectionRenderer from './SectionRenderer';

const Dashboard: React.FC = async () => {
  const homepageSections = await getHomepageSections('dashboard/homepageSections.md');

  return (
    <div>
      {homepageSections.sections.map((section: any, idx: number) => (
        <SectionRenderer key={idx} section={section} />
      ))}
    </div>
  );
};

export default Dashboard;

