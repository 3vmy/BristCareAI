import './App.css';
import Head from './component/layout/head';
import Footer from './component/layout/footer';
import Home from './pages/index.jsx';
import Login from './pages/auth/login.jsx';
import Signup from './pages/auth/signUp.jsx';
import Diagnosis from './pages/user/diagnosis/diagnosis.jsx';
import Result from './pages/user/diagnosis/result/result.jsx';
import Contact from './pages/user/contact/contact.jsx';
import Chat from './pages/user/chat/chat.jsx';
import Settings from './pages/user/settings/settings.jsx';
import Account from './pages/user/settings/account.jsx';
import Privacy from './pages/user/settings/privacy.jsx';
import Help from './pages/user/settings/help.jsx';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function AppWrapper() {
  const location = useLocation();

  // الصفحات التي لا تريد عرض الفوتر فيها
  const noFooterRoutes = ["/chat"];
  const noHeadRoutes = ["/login","/signup", "/result"];

  const showFooter = !noFooterRoutes.includes(location.pathname);
  const showHeader = !noHeadRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && <Head />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/result" element={<Result />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/account" element={<Account />} />
        <Route path="/settings/privacy" element={<Privacy />} />
        <Route path="/settings/help" element={<Help />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}