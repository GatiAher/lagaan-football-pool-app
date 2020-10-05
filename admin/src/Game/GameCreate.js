import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  DateInput,
} from "react-admin";
import teamChoices from "../team-choices";

const GameCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="id" />
      <DateInput source="startTime" />
      <NumberInput source="week" />
      <SelectInput source="visTeam" choices={teamChoices} />
      <SelectInput source="homeTeam" choices={teamChoices} />
    </SimpleForm>
  </Create>
);

export default GameCreate;
