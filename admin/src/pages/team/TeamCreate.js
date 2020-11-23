import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

const TeamCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="id" helperText="team abbreviation in caps" />
      <TextInput source="mascotName" />
      <TextInput source="fullName" />
    </SimpleForm>
  </Create>
);

export default TeamCreate;
