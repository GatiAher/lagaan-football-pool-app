import React from "react";
import { Create, SimpleForm, TextInput, NumberInput } from "react-admin";

const GameCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="id" />
      <NumberInput source="startTime" />
      <NumberInput source="week" />
      <NumberInput source="season" />
      <TextInput source="visTeam" />
      <NumberInput source="visPts" />
      <TextInput source="visStatus" />
      <TextInput source="homeTeam" />
      <NumberInput source="homePts" />
      <TextInput source="homeStatus" />
    </SimpleForm>
  </Create>
);

export default GameCreate;
