import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./UserPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import sa_button from "../../assets/img/sa-button.png"
import Button from 'react-bootstrap/Button';

const UserPage = () => {
  let { id } = useParams();
  let [user, setUser] = useState(null);
  let [username, setUsername] = useState("");
  let [userImage, setUserImage] = useState("");
  let [userAbout, setUserAbout] = useState("");

  useEffect(() => {
    const getUser = () => {
      const usersAPI = `http://127.0.0.1:8000/api/users/${id}/`;
      const getUsers = axios.get(usersAPI);
      axios.all([getUsers]).then(
        axios.spread((...allData) => {
          setUser(allData[0].data);
        })
      );
    };

    getUser();
  }, [id]);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setUserImage(user.image);
      setUserAbout(user.about)
    }
  }, [user])

  return (
    <div className="homepage">
      <div className="top">
        {" "}
        <Navbar />{" "}
      </div>
      <div className="bottom">
        <Sidebar />
        <div className="bottom-content">
          <div className="top-bottom-content">
            <div className="tbc-image">
              <img className="avatar-image" src={userImage} alt="userAvatar" />
            </div>
            <div className="tbc-right">
              <div className="tbc-title1">{username}</div>
              <div className="tbc-detail">{userAbout}</div>
              <div className="tbc-detail">-location-</div>
            </div>
          </div>
          <div className="bottom-bottom-content">
            <div className="right-bottom-content">
              <div className="tbc-title1">Sobre</div>
              <div className="tbc-detail">{userAbout}</div>
              <div className="flex-box">
                <div className="tbc-title1">Top Publicações</div>
              </div>
              <div className="tbc-box2">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
