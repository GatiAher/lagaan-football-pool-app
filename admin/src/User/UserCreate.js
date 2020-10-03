import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
} from "react-admin";

const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="username" />
      <TextInput source="id" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="rank" />
      <NumberInput source="score" />
      <TextInput source="wk1A" />
      <TextInput source="wk1B" />
      <TextInput source="wk2A" />
      <TextInput source="wk2B" />
      <TextInput source="wk3A" />
      <TextInput source="wk3B" />
      <TextInput source="wk4A" />
      <TextInput source="wk4B" />
      <TextInput source="wk5A" />
      <TextInput source="wk5B" />
      <TextInput source="wk6A" />
      <TextInput source="wk6B" />
      <TextInput source="wk7A" />
      <TextInput source="wk7B" />
      <TextInput source="wk8A" />
      <TextInput source="wk8B" />
      <TextInput source="wk9A" />
      <TextInput source="wk9B" />
      <TextInput source="wk10A" />
      <TextInput source="wk10B" />
      <TextInput source="wk11A" />
      <TextInput source="wk11B" />
      <TextInput source="wk12A" />
      <TextInput source="wk12B" />
      <TextInput source="wk13A" />
      <TextInput source="wk13B" />
      <TextInput source="wk14A" />
      <TextInput source="wk14B" />
      <TextInput source="wk15A" />
      <TextInput source="wk15B" />
      <TextInput source="wk16A" />
      <TextInput source="wk16B" />
      <TextInput source="wk17A" />
      <TextInput source="wk17B" />
      <DateInput disabled source="created_at" />
      <DateInput disabled source="updated_at" />
    </SimpleForm>
  </Create>
);

export default UserCreate;
