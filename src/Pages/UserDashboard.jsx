import { useEffect, useState } from "react"; // Added useState for managing state
import Header from "../Components/UserHeader";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../Firebase/Firebase';

const UserDashBoard = () => {
  const [userType, setUserType] = useState(null); // State to store user type
  const uuid = localStorage.getItem("uuid");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDoc = doc(db, "users", uuid);
        const docSnap = await getDoc(userDoc);
        
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserType(userData); // Set user type in state
        } else {
          console.error("No such user found!");
        }
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    }

    fetchUser(); // Call fetchUser function
  }, [uuid]); // Added uuid as a dependency to useEffect

  console.log(userType);

  return (
    <div className="dashboard-container">
      <Header/>
      <h1>Welcome {userType && userType.firstName} </h1>
      
    </div>
  );
};
export default UserDashBoard;