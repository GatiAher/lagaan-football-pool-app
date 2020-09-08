import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email, sub } = user;

  return (
    <div>
      <h1>{name}</h1>
      <h1>{sub}</h1>
      <img
        src={picture}
        alt="Profile"
        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
      />
      <div>{email}</div>
    </div>
  );
};

export default Profile;
