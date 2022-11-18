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
  CompanyDetails,
  TransactionList,
} from "./module";

export const enum RoutesEnum {
  Dashboard = "dashboard",
  PartiesList = "parties",
  CompaniesList = "companies",
  AreasList = "areas",
  Transaction = "transaction",
  Reports = "reports",
  Profile = "profile",
  TransactionList = "transactions",
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Dashboard />} />
      <Route path="/" element={<Dashboard />} />
      <Route path={RoutesEnum.Dashboard} element={<Dashboard />} />
      <Route path={RoutesEnum.PartiesList} element={<PartiesList />} />
      <Route path={RoutesEnum.CompaniesList} element={<CompaniesList />} />
      <Route path={RoutesEnum.AreasList} element={<AreasList />} />
      <Route path={RoutesEnum.Reports} element={<Report />} />
      <Route path={RoutesEnum.Profile} element={<Profile />} />
      <Route path={RoutesEnum.TransactionList} element={<TransactionList />} />
      <Route path={"transaction/:id"} element={<Transaction />} />
      <Route path={"parties/:id"} element={<PartyDetails />} />
      <Route path={"companies/:id"} element={<CompanyDetails />} />
    </Routes>
  );
};

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Signin />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/" element={<Signin />} />
      <Route path="/Signin" element={<Signin />} />
    </Routes>
  );
};
