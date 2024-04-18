// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './LandingPage/HomePage.jsx';
import ReviewForm from './ReviewPage/ReviewForm.jsx';
import AboutUs from './Pages/AboutUs.jsx';
import ContactUs from './Pages/ContactUs.jsx';

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
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
