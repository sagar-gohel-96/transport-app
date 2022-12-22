import { Route, Routes } from "react-router-dom";

import {
  Dashboard,
  Profile,
  Report,
  Transaction,
  Signin,
  Signup,
  PartyDetails,
  PartiesList,
  TransactionList,
  DateWiseReports,
  PartyWiseReports,
  CompanyProfile,
  DateWiseReportswithHeader,
  PartyWiseReportswithHeader,
  AreasList,
} from "./module";
import { AreaDetails } from "./module/AreasList/AreaDetails";

export const enum RoutesMapping {
  Dashboard = "dashboard",
  PartiesList = "parties",
  CompaniesList = "companies",
  CompaniesProfile = "company-profile",
  AreasList = "areas",
  Transaction = "transactions",
  Reports = "reports",
  Profile = "profile",
  TransactionList = "transactions",
  DateWiseReports = "date-wise-reports",
  PartyWiseReports = "party-wise-reports",
  DateWiseReportsWithHeader = "date-wise-reports-with-header",
  PartyWiseReportsWithHeader = "party-wise-reports-with-header",
  AreasDemo = "areas-demo",
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Dashboard />} />
      <Route path="/" element={<Dashboard />} />
      <Route path={RoutesMapping.Dashboard} element={<Dashboard />} />
      <Route path={RoutesMapping.PartiesList} element={<PartiesList />} />
      <Route path={RoutesMapping.AreasList} element={<AreasList />} />
      <Route path={RoutesMapping.Reports} element={<Report />} />
      <Route path={RoutesMapping.Profile} element={<Profile />} />
      <Route
        path={RoutesMapping.TransactionList}
        element={<TransactionList />}
      />
      <Route
        path={RoutesMapping.CompaniesProfile}
        element={<CompanyProfile />}
      />
      <Route
        path={RoutesMapping.DateWiseReports}
        element={<DateWiseReports />}
      />
      <Route
        path={RoutesMapping.PartyWiseReports}
        element={<PartyWiseReports />}
      />
      <Route
        path={`${RoutesMapping.DateWiseReportsWithHeader}`}
        element={<DateWiseReportswithHeader />}
      />
      <Route
        path={`${RoutesMapping.PartyWiseReportsWithHeader}`}
        element={<PartyWiseReportswithHeader />}
      />
      <Route
        path={`${RoutesMapping.Transaction}/:id`}
        element={<Transaction />}
      />
      <Route
        path={`${RoutesMapping.Transaction}/duplicate/:id`}
        element={<Transaction />}
      />
      <Route path={"parties/:id"} element={<PartyDetails />} />
      <Route
        path={`${RoutesMapping.AreasList}/:id`}
        element={<AreaDetails />}
      />
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
