import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "firebase/database";
import Header from "../Components/UserHeader";
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
      {firstName && (
        <div>
          <h1>Welcome {firstName}!!!</h1>
          <div className="login-form">
            <form style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <lable>Account Type</lable>
                <br />
                <select value={user} onChange={(e) => setUser(e.target.value)}>
                  <option>User</option>
                  <option>Dietitian</option>
                </select>
              </div>

              <div>
                <lable>Email</lable>
                <br />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <lable>Password</lable>
                <br />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div style={{ marginTop: 10 }}>
                <input type="submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashBoard;