import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="username" />
      <TextInput source="id" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
    </SimpleForm>
  </Create>
);

export default UserCreate;
