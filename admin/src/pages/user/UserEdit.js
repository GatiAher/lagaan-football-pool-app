import React from "react";
import { Edit, SimpleForm, TextInput, SelectInput } from "react-admin";

import teamChoices from "../../selection-options/team-choices";
import weeks from "../../selection-options/weeks";

const UserTitle = ({ record }) => {
  return <span>Editing User {record ? `"${record.username}"` : ""}</span>;
};

const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      {weeks.map((weekId) => (
        <div>
          <SelectInput source={`${weekId}A`} choices={teamChoices} />
          <SelectInput source={`${weekId}B`} choices={teamChoices} />
        </div>
      ))}
    </SimpleForm>
  </Edit>
);

export default UserEdit;
