import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PovProvider } from "./context/PovContext";
import PortalLayout from "./components/layout/PortalLayout";
import WelfareLayout from "./components/layout/WelfareLayout";
import PortalHome from "./views/PortalHome";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Wallet from "./views/Wallet";
import Marketplace from "./views/Marketplace";
import Inbox from "./views/Inbox";
import AiAssistant from "./views/AiAssistant";
import BenefitRequests from "./views/BenefitRequests";
import RequestDetail from "./views/RequestDetail";
import Transactions from "./views/Transactions";
import TransactionDetail from "./views/TransactionDetail";
import Onboarding from "./views/Onboarding";
import Settings from "./views/Settings";

export default function App() {
  return (
    <PovProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/portal" replace />} />
          <Route path="/portal" element={<PortalLayout />}>
            <Route index element={<PortalHome />} />
          </Route>

          <Route path="/welfare" element={<WelfareLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="wallet/add-family-member" element={<Wallet />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="ai" element={<AiAssistant />} />
            <Route path="requests" element={<BenefitRequests />} />
            <Route path="requests/:requestId" element={<RequestDetail />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="transactions/:transactionId" element={<TransactionDetail />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PovProvider>
  );
}
