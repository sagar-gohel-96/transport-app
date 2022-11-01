import { Route, Routes } from "react-router-dom";
import { Routes as RoutesEnum } from "./components/layout/Navbar";
import {
  AreaDetails,
  CompanyDetails,
  Dashboard,
  PartiesDetails,
  Profile,
  Report,
  Transaction,
  NotFoundPage,
  Signin,
  Signup,
} from "./module";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path={RoutesEnum.Dashboard} element={<Dashboard />} />
      <Route path={RoutesEnum.PartiesDetails} element={<PartiesDetails />} />
      <Route path={RoutesEnum.CompanyDetails} element={<CompanyDetails />} />
      <Route path={RoutesEnum.AreaDetails} element={<AreaDetails />} />
      <Route path={RoutesEnum.Transaction} element={<Transaction />} />
      <Route path={RoutesEnum.Reports} element={<Report />} />
      <Route path={RoutesEnum.Profile} element={<Profile />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/Signup" element={<Signup />} />
      <Route path="/" element={<Signin />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
