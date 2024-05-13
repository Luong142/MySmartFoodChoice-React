// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './LandingPage/HomePage.jsx';
import ReviewForm from './ReviewPage/ReviewForm.jsx';
import AboutUs from './Pages/AboutUs.jsx';
import ContactUs from './Pages/ContactUs.jsx';
import HomeSignInPage from './AuthenticationPage/HomeSignInPage.jsx';
import HomeSignUpPage from './AuthenticationPage/HomeSignUpPage.jsx';
import Guest from './Pages/Guest.jsx'; 
import GuestViewMeal from './Pages/GuestViewMeal.jsx'; 
import GuestViewFood from './Pages/GuestViewFood.jsx'; 
import GuestRecordMeal from './Pages/GuestRecordMeal.jsx'; 
//import DietitianDashBoard from './Dashboard/DietitianDashBoard.jsx';
import UserDashBoard from './Pages/UserDashboard.jsx';
import CreateUserProfile from './Pages/CreateUserProfile.jsx';


/* don't delete this import */
import './App.css';

function App() 
{
  // remove login and logout

  // add more routes as needed
  // review database share route
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path = "/ReviewForm" element={<ReviewForm />} /> 
        <Route path = "/AboutUs" element={<AboutUs />} /> 
        <Route path = "/ContactUs" element={<ContactUs />} /> 
        <Route path="/SignIn" element={<HomeSignInPage />} />
        <Route path="/SignUp" element={<HomeSignUpPage />} />
        <Route path="/Guest" element={<Guest />} />
        <Route path="/GuestRecordMeal" element={<GuestRecordMeal />} />
        <Route path="/GuestViewMeal" element={<GuestViewMeal />} />
        <Route path="/GuestViewFood" element={<GuestViewFood />} />
        <Route path="/UserProfile" element={<UserDashBoard />} />
        <Route path="/CreateUserProfile" element={<CreateUserProfile />} />

        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
