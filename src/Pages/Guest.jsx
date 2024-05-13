import { Link } from 'react-router-dom';
import './Guest.css';

function Guest() {
  return (
    <div className="guest-container">
      <h2>Welcome, Guest!</h2>
      <div className="guest-buttons">
        <Link to="/GuestRecordMeal">
          <button>Record Meal</button>
        </Link>
        <Link to="/GuestViewMeal">
          <button>View Meal History</button>
        </Link>
        <Link to="/GuestViewFood">
          <button>View Food Recipes</button>
        </Link>
      </div>
      <div className="signup-link">
        <p>Want to upgrade to user account? <Link to="/signup">Sign up here</Link></p>
      </div>
      <div className="back-button">
        <Link to="/">Back to Homepage</Link>
      </div>
    </div>
  );
}

export default Guest;