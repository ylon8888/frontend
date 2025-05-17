import { ReactNode } from 'react';
import DashboardLayout from '@/layout/DashboardLayout/DashboardLayout';

const layout = ({ children }: { children: ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default layout;
