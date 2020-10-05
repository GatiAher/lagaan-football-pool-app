import React from "react";
import { Create, SimpleForm, TextInput, SelectInput } from "react-admin";
import teamChoices from "../team-choices";
import weeks from "../weeks";

const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="username" />
      <TextInput source="id" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      {weeks.map((weekId) => (
        <SelectInput source={weekId} choices={teamChoices} />
      ))}
    </SimpleForm>
  </Create>
);

export default UserCreate;
