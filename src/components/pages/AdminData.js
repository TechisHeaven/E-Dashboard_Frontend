import React, { useEffect, useState } from "react";

const AdminData = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (req, res) => {
    // let userRole =  JSON.parse(localStorage.getItem("user"));
    let adminId = JSON.parse(localStorage.getItem("users"));

    let result = await fetch(
      `http://localhost:5000/api/admin/${adminId._id}/user`,
      {
        method: "get",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    setUsers(result);
  };




  const deletuser = async (id) => {
    console.log(id);
    let result = await fetch(`http://localhost:5000/api/admin/delete/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      alert("User deleted successfully");
      getUsers();
    }
  };

  return (
    <div className="product-list">
      <h1>Users List</h1>
      <ul className="col-row">
        <li>S. no</li>
        <li className="user-id">ID</li>
        <li>Image</li>
        <li>Name</li>
        <li>Email</li>
        <li>Role</li>
        <li>Operators</li>
      </ul>
      {users.length > 0 ? (
        users.map((items, index) => (
          <ul className="user-col" key={index}>
            <li>{index + 1}</li>
            <li className="user-id">{items._id}</li>
            <li>
              <img className="userImg" width="100px" height="100px" src={items.myFile} alt="" />
            </li>
            <li>{items.name}</li>
            <li>{items.email}</li>
            <li>{items.role}</li>
            <li>
              <button onClick={() => deletuser(items._id)}>Delete</button>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Product found</h1>
      )}
    </div>
  );
};

export default AdminData;
