import { Route, Routes } from 'react-router-dom';
import {
  AreaDetails,
  CompanyDetails,
  Dashboard,
  PartyDetails,
  Profile,
  Report,
  Transaction,
} from './module';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="party-details" element={<PartyDetails />} />
      <Route path="Company-details" element={<CompanyDetails />} />
      <Route path="area-details" element={<AreaDetails />} />
      <Route path="transaction" element={<Transaction />} />
      <Route path="reports" element={<Report />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
};
