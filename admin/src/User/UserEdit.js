import React from "react";
import { Edit, SimpleForm, TextInput, SelectInput } from "react-admin";
import teamChoices from "../team-choices";
import weeks from "../weeks";

const UserTitle = ({ record }) => {
  return <span>Editing User {record ? `"${record.username}"` : ""}</span>;
};

const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="id" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      {weeks.map((weekId) => (
        <SelectInput source={weekId} choices={teamChoices} />
      ))}
    </SimpleForm>
  </Edit>
);

export default UserEdit;
