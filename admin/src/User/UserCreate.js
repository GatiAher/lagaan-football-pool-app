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
        <div>
          <SelectInput source={`${weekId}A`} choices={teamChoices} />
          <SelectInput source={`${weekId}B`} choices={teamChoices} />
        </div>
      ))}
    </SimpleForm>
  </Create>
);

export default UserCreate;
