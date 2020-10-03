import React from "react";
import { Create, SimpleForm, TextInput, NumberInput } from "react-admin";

const TeamCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="id" />
      <TextInput source="mascotName" />
      <TextInput source="fullName" />
      <NumberInput source="numOfWin" />
      <NumberInput source="numOfLoss" />
      <NumberInput source="numOfTie" />
      <TextInput source="wk1" />
      <TextInput source="wk2" />
      <TextInput source="wk3" />
      <TextInput source="wk4" />
      <TextInput source="wk5" />
      <TextInput source="wk6" />
      <TextInput source="wk7" />
      <TextInput source="wk8" />
      <TextInput source="wk9" />
      <TextInput source="wk10" />
      <TextInput source="wk11" />
      <TextInput source="wk12" />
      <TextInput source="wk13" />
      <TextInput source="wk14" />
      <TextInput source="wk15" />
      <TextInput source="wk16" />
      <TextInput source="wk17" />
    </SimpleForm>
  </Create>
);

export default TeamCreate;
