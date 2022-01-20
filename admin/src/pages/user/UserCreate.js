import React from "react";
import { Create, SimpleForm, TextInput, BooleanInput } from "react-admin";

const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="username" />
      <TextInput source="id" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <BooleanInput source="active" defaultValue />
      <BooleanInput source="activePlayoff" defaultValue />
    </SimpleForm>
  </Create>
);

export default UserCreate;
