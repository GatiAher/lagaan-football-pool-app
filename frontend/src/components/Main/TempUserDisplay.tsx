import React from "react";
import { useUser } from "../../context/TempUserContext";

const TempUserDisplay = () => {
  const { user } = useUser();
  return (
    <div>
      <h5>{`CONTEXT USERNAME: ${user.username}`}</h5>
      <h5>{`CONTEXT USER_ID: ${user.user_id}`}</h5>
    </div>
  );
};

export default TempUserDisplay;
