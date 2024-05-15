import { useState, useEffect } from "react";
import Header from "../HeaderComponents/UserHeader";
import { getDatabase, ref, set, query, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import "./CreateUserProfile.css"
import { imageDb } from "../Firebase/Firebase";
import { uploadBytes } from "firebase/storage";

const CreateUserProfile = () => {
  const userId = localStorage.getItem("uid");
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [allergyEgg, setAllergyEgg] = useState("");
  const [allergyPeanut, setAllergyPeanut] = useState("");
  const [allergySeafood, setAllergySeafood] = useState("");
  const [diabetes, setDiabetes] = useState("");
  const [dietType, setDietType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [highBloodPressure, setHighBloodPressure] = useState("");
  const [hightCholestrol, setHightCholestrol] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const [loading, setLoading] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const imgRef = sRef(imageDb, `ProfilePics/${userId}`);
      await uploadBytes(imgRef, image);
      const imageUrl = await getDownloadURL(imgRef);
      setProfilePicture(imageUrl);
      alert("image upload successfuly");

      const db = getDatabase();
      const profileRef = ref(db, `User Profile/${userId}`);
      console.log("hello", profilePicture, imageUrl);

      await set(profileRef, {
        age,
        allergyEgg,
        allergySeafood,
        allergyPeanut,
        diabetes,
        dietType,
        firstName,
        lastName,
        gender,
        height,
        hightCholestrol,
        weight,
        profileImageUrl: imageUrl,
      });
      alert("Profile updated successfuly!");
      navigate("/UserDashBoard");
    } catch (error) {
      console.error("Failed to Profile updated:", error);
      alert("Failed to Profile updated");
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const userRef = query(ref(db, `User Profile/${userId}`));

    const unsubscribeUser = onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setAge(userData.age || "");
          setAllergyEgg(userData.allergyEgg || "");
          setAllergyEgg(userData.allergyPeanut || "");
          setAllergySeafood(userData.allergySeafood || "");
          setDiabetes(userData.diabetes || "");
          setDietType(userData.dietType || "");
          setFirstName(userData.firstName || "");
          setLastName(userData.lastName || "");
          setGender(userData.gender || "");
          setHeight(userData.height || "");
          setHighBloodPressure(userData.highBloodPressure || "");
          setHightCholestrol(userData.hightCholestrol || "");
          setWeight(userData.weight || "");
          setLoading(false);
        } else {
          console.log("User not found");
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribeUser();
  }, []);

  return (
    <div className="dashboard-container">
      <Header />

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div style={{width:"100%",position:"absolute",display:"flex",justifyContent:"center"}}>
          <div style={{width:"35%",background:"dodgerblue",padding:"20px"}}>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit}
          >
            <div>
              <label>Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div>
              <label>Allergy egg</label>
              <select
                value={allergyEgg}
                onChange={(e) => setAllergyEgg(e.target.value)}
              >
                <option>true</option>
                <option>false</option>
              </select>
            </div>

            <div>
              <label>Allergy peanut</label>
              <select
                value={allergyPeanut}
                onChange={(e) => setAllergyPeanut(e.target.value)}
              >
                <option>true</option>
                <option>false</option>
              </select>
            </div>

            <div>
              <label>Allergy seafood</label>
              <select
                value={allergySeafood}
                onChange={(e) => setAllergySeafood(e.target.value)}
              >
                <option>true</option>
                <option>false</option>
              </select>
            </div>

            

            <div>
              <label>Diabetes</label>
              <select
                value={diabetes}
                onChange={(e) => setDiabetes(e.target.value)}
              >
                <option>true</option>
                <option>false</option>
              </select>
            </div>

            <div>
              <label>Diet type</label>
              <select
                value={dietType}
                onChange={(e) => setDietType(e.target.value)}
              >
                <option>Vegan</option>
                <option>Veg</option>
                <option>Non veg</option>
              </select>
             
            </div>

            <div>
              <label>First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label>Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>male</option>
                <option>female</option>
              </select>
            </div>

            <div>
              <label>Height</label>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div>
              <label>High blood pressure</label>
              <select
                value={highBloodPressure}
                onChange={(e) => setHighBloodPressure(e.target.value)}
              >
                <option>true</option>
                <option>false</option>
              </select>
            </div>

            <div>
              <label>High cholestrol</label>
              <select
                value={hightCholestrol}
                onChange={(e) => setHightCholestrol(e.target.value)}
              >
                <option>true</option>
                <option>false</option>
              </select>
            </div>

            

            <div>
              <div>
                <label>Profile picture</label>
              </div>
              <div>
                <input
                  type="file"
                  id="myFile"
                  name="filename"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>

            <div>
              <label>Weight</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 10 }}>
              <input type="submit" value={"Save"} className="save-button"/>
            </div>
          </form>
        </div>
        </div>
      )}
    </div>
  );
};

export default CreateUserProfile;