import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shell from "./components/layout/Shell";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Wallet from "./views/Wallet";
import Marketplace from "./views/Marketplace";
import BenefitDetail from "./views/BenefitDetail";
import SocialEventDetail from "./views/SocialEventDetail";
import Inbox from "./views/Inbox";
import BenefitRequests from "./views/BenefitRequests";
import Transactions from "./views/Transactions";
import AiAssistant from "./views/AiAssistant";
import RequestDetail from "./views/RequestDetail";
import TransactionDetail from "./views/TransactionDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="wallet/add-family-member" element={<Wallet />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="transactions/:transactionId" element={<TransactionDetail />} />
          <Route path="requests" element={<BenefitRequests />} />
          <Route path="requests/:requestId" element={<RequestDetail />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="ai-assistant" element={<AiAssistant />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="marketplace/benefits/:benefitId" element={<BenefitDetail />} />
          <Route path="events/:eventId" element={<SocialEventDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
