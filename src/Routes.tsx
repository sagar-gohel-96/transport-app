import { Route, Routes } from 'react-router-dom';
import {
  AreaMaster,
  CompanyMaster,
  Dashboard,
  PartyMaster,
  Report,
  Transaction,
} from './module';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="party-master" element={<PartyMaster />} />
      <Route path="Company-master" element={<CompanyMaster />} />
      <Route path="area-master" element={<AreaMaster />} />
      <Route path="transaction" element={<Transaction />} />
      <Route path="reports" element={<Report />} />
    </Routes>
  );
};
