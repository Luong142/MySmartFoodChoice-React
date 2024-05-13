import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../Firebase/Firebase'; // Assuming db is Firestore instance

function ShowAllUsers() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, 'users')); // Query all documents in the "users" collection
        const querySnapshot = await getDocs(q); // Execute the query and get a snapshot of the results

        // Process the snapshot and extract user data
        const userData = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }; // Include document ID in user data
        });

        setUsers(userData); // Update the state with user data
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); // Call the fetchUsers function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId)); // Delete the document with the specified user ID
      setUsers(users.filter((user) => user.id !== userId)); // Update the state to remove the deleted user
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Function to update a user
  const updateUser = async (userId, updatedUserData) => {
    try {
      await updateDoc(doc(db, 'users', userId), updatedUserData); // Update the document with the specified user ID
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Function to handle the click event of the "Update" button
  const handleUpdateClick = (userId) => {
    setEditingUserId(userId); // Set the editing user ID to show input fields for editing
  };

  // Function to handle input change when editing user data
  const handleInputChange = (fieldName, newValue) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editingUserId ? { ...user, [fieldName]: newValue } : user
      )
    );
  };

  // Function to handle the click event of the "Save" button
  const handleSaveClick = async (userId) => {
    const editingUser = users.find((user) => user.id === userId);
    await updateUser(userId, {
      firstName: editingUser.firstName,
      lastName: editingUser.lastName,
      email: editingUser.email,
    });
    setEditingUserId(null); // Reset editing user ID after saving changes
  };

  // Function to handle input change in the search field
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ marginLeft: '200px' }}>
      <h2>All Users</h2>
      <div style={{ textAlign: 'center' }}>
        <input
          type='text'
          placeholder='Search by email...'
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: '400px', height: '40px', fontSize: '20px' }}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type='text'
                    value={user.firstName}
                    onChange={(e) =>
                      handleInputChange('firstName', e.target.value)
                    }
                  />
                ) : (
                  user.firstName
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type='text'
                    value={user.lastName}
                    onChange={(e) =>
                      handleInputChange('lastName', e.target.value)
                    }
                  />
                ) : (
                  user.lastName
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type='text'
                    value={user.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <>
                    <button onClick={() => handleSaveClick(user.id)}>
                      Save
                    </button>
                    <button
                      style={{ marginLeft: '30px' }}
                      onClick={() => setEditingUserId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleUpdateClick(user.id)}>
                      Update
                    </button>
                    <button
                      style={{ marginLeft: '30px' }}
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowAllUsers;
