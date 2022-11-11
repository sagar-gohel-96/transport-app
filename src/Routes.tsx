import { Route, Routes } from "react-router-dom";

import {
  CompaniesList,
  Dashboard,
  Profile,
  Report,
  Transaction,
  Signin,
  Signup,
  PartyDetails,
  PartiesList,
  AreasList,
} from "./module";

export const enum RoutesEnum {
  Dashboard = "dashboard",
  PartiesList = "parties",
  CompaniesList = "companies",
  AreasList = "areas",
  Transaction = "transactions",
  Reports = "reports",
  Profile = "profile",
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path={RoutesEnum.Dashboard} element={<Dashboard />} />
      <Route path={RoutesEnum.PartiesList} element={<PartiesList />} />
      <Route path={RoutesEnum.CompaniesList} element={<CompaniesList />} />
      <Route path={RoutesEnum.AreasList} element={<AreasList />} />
      <Route path={RoutesEnum.Transaction} element={<Transaction />} />
      <Route path={RoutesEnum.Reports} element={<Report />} />
      <Route path={RoutesEnum.Profile} element={<Profile />} />
      <Route path={"parties/:id"} element={<PartyDetails />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/Signup" element={<Signup />} />
      <Route path="/" element={<Signin />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="*" element={<Signin />} />
    </Routes>
  );
};
