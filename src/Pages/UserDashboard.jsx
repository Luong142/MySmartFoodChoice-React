import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "firebase/database";
import Header from "../HeaderComponents/UserHeader";
//import "./UserDashboard.css";

const UserDashBoard = () => {

  const [firstName, setFirstName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const db = getDatabase();
    const userRef = query(
      ref(db, "Registered Accounts"),
      orderByChild("email"),
      equalTo(userEmail)
    );

    const unsubscribeUser = onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userKey = Object.keys(userData)[0];
          const userFirstName = userData[userKey].accountType;
          const userEmail = userData[userKey].email;
          const userPassword = userData[userKey].password;
          setFirstName(userFirstName);
          setEmail(userEmail);
          setPassword(userPassword);
          setUser(userFirstName);
        } else {
          console.log("User not found");
        }
      },
      (error) => {
        console.error("Error fetching data: ", error);
      }
    );
    return () => unsubscribeUser();
  }, [userEmail]);

  return (
    <div className="dashboard-container">
      <Header/>
      Welcome  {firstName}
    </div>
  );
};

export default UserDashBoard;