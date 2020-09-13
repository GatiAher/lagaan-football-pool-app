import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../context/TempUserContext";

// modify user data
// modify game data
// reset user data
// reset game data
// set current week
// set current season

const Admin = () => {
  const { user, setUser } = useUser();

  // temporary testing, create and select fake users
  const [username, setUsername] = useState(user.username);
  const [userId, setUserId] = useState(user.user_id);
  const [message, setMessage] = useState("");

  const handleUserCreate = () => {
    axios
      .post("/user/create", {
        username: username,
        user_id: userId,
      })
      .then((res) => {
        setMessage(res.data.message);
        setUser({
          username: username,
          user_id: userId,
        });
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  const handleUserGet = () => {
    axios
      .get(`/user/id/${userId}`)
      .then((res) => {
        console.log(res);
        setMessage(JSON.stringify(res.data));
        setUser({
          username: res.data[0].username,
          user_id: res.data[0].user_id,
        });
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  return (
    <div className="game-list-wrapper">
      <h5>{`MESSAGE: ${message}`}</h5>
      <div className="game-list-form">
        <div className="form-wrapper">
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="username">
                Enter USERNAME:
              </label>
              <input
                className="form-input"
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.currentTarget.value);
                }}
              />
            </fieldset>
            <fieldset>
              <label className="form-label" htmlFor="userId">
                Enter USERID:
              </label>
              <input
                className="form-input"
                type="number"
                id="userId"
                name="userId"
                value={userId}
                onChange={(e) => {
                  setUserId(parseInt(e.currentTarget.value, 10));
                }}
              />
            </fieldset>
          </div>
        </div>
        <button onClick={handleUserCreate} className="btn btn-add">
          Create New User
        </button>
        <button onClick={handleUserGet} className="btn btn-add">
          Select User
        </button>
      </div>
    </div>
  );
};

export default Admin;
