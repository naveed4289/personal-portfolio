import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from './pages/Login';
import { Error } from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminLayout from "./components/layout/AdminLayout";
import Footer from "./components/Footer";
import Mains from "./pages/Mains";
import AdminAccount from "./adminPanel/AdminAccount";
import AdminContacts from "./adminPanel/AdminContacts";
import AdminAbout from "./adminPanel/AdminAbout";
import AdminProject from "./adminPanel/AdminProject";
import SplashScreen from "./pages/SplashScreen";
import { useEffect, useState } from "react";
import AdminSkill from "./adminPanel/AdminSkill";
import AdminExperience from "./adminPanel/AdminExperience";
import AdminDashboard from "./adminPanel/AdminDashboard";

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false); 
    }, 1000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
      <BrowserRouter>
        {isSplashVisible ? (
          <SplashScreen />
        ) : (
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Mains />} />
                <Route path="*" element={<Error />} />
                <Route path='/login' element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/resetPassword/:Token" element={<ResetPassword />} />

                <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard/>} />
                  <Route path="show/:id/edit" element={<AdminAccount />} />
                  <Route path="messages" element={<AdminContacts />} />
                  <Route path="about" element={<AdminAbout />} />
                  <Route path="projects" element={<AdminProject />} />
                  <Route path="skill" element={<AdminSkill />} />
                  <Route path="experience" element={<AdminExperience />} />
                  <Route path="*" element={<Error />} />
                </Route>
              </Routes>
            </main>
            <Footer />  
          </div>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
