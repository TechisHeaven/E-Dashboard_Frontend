import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [postImage, setPostImage] = useState({ myFile: "", name: "" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [Bio, setBio] = useState("");
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      setLoader(true)
      let uid = JSON.parse(localStorage.getItem("users"));
      let result = await axios(`http://localhost:5000/api/upload/${uid._id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      // let datalength = result.data.length-1;
      setPostImage(result.data[0]);
      setName(result.data[0].name);
      setEmail(result.data[0].email);
      setRole(result.data[0].role);
      setBio( JSON.parse(localStorage.getItem("Bio")) )
    } catch (err) {
      console.log(err);
    }
  };

  const UpdatePost = async (newImage) => {
    try {
      let uid = JSON.parse(localStorage.getItem("users"));
      uid = uid._id;
      let data = { objects: [uid, newImage, name] };
      let result = await axios.put(
        `http://localhost:5000/api/upload/update/${uid}`,
        data,
        {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      localStorage.setItem("Image", JSON.stringify(result.data));
      setBio(Bio)
      localStorage.setItem("Bio", JSON.stringify(Bio));
      alert("Data updated successfully");
      getImage();
    } catch (err) {
      console.log(err);
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    UpdatePost(postImage);
    
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    let uid = JSON.parse(localStorage.getItem("users"));
    uid = uid._id;
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, uid: uid, myFile: base64 });
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const RemovePhoto = async () => {
    try {
      let uid = JSON.parse(localStorage.getItem("users"));
      // await axios.put(`http://localhost:5000/api/delete/photo/${uid._id}`,{
      //   headers:{
      //     authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      // }

      await fetch(`http://localhost:5000/api/delete/photo/${uid._id}`, {
        method: "put",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      getImage();
      // });
    } catch (err) {
      console.log(err);
    }
  };

  const RemoveUser = async () => {
    try {
      let uid = JSON.parse(localStorage.getItem("users"));
      await axios.delete(`http://localhost:5000/api/user/delete/${uid._id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
    localStorage.removeItem("users");
    localStorage.removeItem("token");
    localStorage.removeItem("Image");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="con">
        <div className="banner">
          <div className="img"></div>
        </div>

        <form className="imgform" onSubmit={handlesubmit}>
          <div className="left_con">
            <div className="left_con_main">
              <label htmlFor="file-upload" className="custom-file-upload">
                <img
                  width="200px"
                  height="200px"
                  className="profileImg"
                  src={postImage.myFile}
                  alt="logo "
                />
              </label>
              <div className="subcon">
                <p className="heading">Profile</p>
                <p>Upload your photo and personal details. </p>
              </div>

              <input
                type="file"
                label="Image"
                name="myFile"
                id="file-upload"
                accept=".jpg , .png , .jpeg"
                onChange={(e) => handleFileUpload(e)}
                width="500px"
                height="500px"
              />
            </div>
            <div className="con_btn">
              <button onClick={handlesubmit}>save</button>
            </div>
          </div>
          <div className="con_2">
            <div className="item">
              <label>Name</label>
              <div className="items-input">
                <i className="fa-solid fa-user"></i>
                <input
                  className="input"
                  type="text"
                  value={name}
                  placeholder="Your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="item">
              <label>Email</label>
              <div className="items-input disable">
                <i className="fa-regular fa-envelope"></i>
                <input
                  type="text"
                  disabled
                  value={email}
                  placeholder="Your Email"
                  onChange={(e) => alert("Not Updatable")}
                />
              </div>
            </div>

            <div className="item bio">
              <label>Your Bio</label>
              <div className="items-input">
                <textarea
                  type="text"
                  placeholder="Add a short bio.."
                  rows="10"
                  cols="50"
                  value={Bio || "no biooooooooo"}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>

            <div className="item ppp">
              <label>Your Role</label>
              <div className="items-input disable">
                <i className="fa-solid fa-person"></i>
                <input
                  type="text"
                  disabled
                  value={role}
                  placeholder="Your Role"
                  onChange={(e) => alert("Not Updatable by user")}
                />
              </div>
            </div>


          </div>
        </form>
        <div className="con_btn_logout">
          <button onClick={RemoveUser}>
            <i className="fa-solid fa-trash"></i> Delete User
          </button>
          <button className="profileImg_remove" onClick={RemovePhoto}>
            Remove Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
