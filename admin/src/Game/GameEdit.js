import React from "react";
import { Edit, SimpleForm, TextInput, NumberInput } from "react-admin";

const GameEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
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
  </Edit>
);

export default GameEdit;
