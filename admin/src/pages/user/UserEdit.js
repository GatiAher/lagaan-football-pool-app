import React from "react";
import { Edit, SimpleForm, TextInput, SelectInput } from "react-admin";

import teamChoices from "../../selection-options/team-choices";
import { userWeeks } from "../../selection-options/weeks";

const UserTitle = ({ record }) => {
  return <span>Editing User {record ? `"${record.username}"` : ""}</span>;
};

const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      {userWeeks.map((weekId) => (
        <SelectInput source={weekId} choices={teamChoices} />
      ))}
    </SimpleForm>
  </Edit>
);

export default UserEdit;
