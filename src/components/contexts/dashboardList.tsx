import { DashboardEntity } from '@/model/dashboard/dashboard';
import { createContext } from 'react';

type DashboardListContextType = {
  dashboardList: DashboardEntity[];
  setDashboardList: React.Dispatch<React.SetStateAction<DashboardEntity[]>>;
};

export const DashboardListContext = createContext<DashboardListContextType>({
  dashboardList: [],
  setDashboardList: () => {},
});
