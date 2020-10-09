import React, { useState } from "react";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../../context/TempUserContext";

const Admin = () => {
  const { user, setUser } = useUser();

  // temporary testing, create and select fake users
  const [userId, setUserId] = useState(user.user_id);
  const [message, setMessage] = useState("");

  const handleUserGet = () => {
    axios
      .get(`/user/${userId}`)
      .then((res) => {
        console.log(res);
        setMessage(JSON.stringify(res.data));
        setUser({
          username: res.data[0].username,
          user_id: res.data[0].id,
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
              <label className="form-label" htmlFor="userId">
                Enter USERID:
              </label>
              <input
                className="form-input"
                type="text"
                id="userId"
                name="userId"
                value={userId}
                onChange={(e) => {
                  setUserId(e.currentTarget.value);
                }}
              />
            </fieldset>
          </div>
        </div>
        <button onClick={handleUserGet} className="btn btn-add">
          Select User
        </button>
      </div>
    </div>
  );
};

export default Admin;
