import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  DateInput,
} from "react-admin";
import teamChoices from "../team-choices";

const GameEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <DateInput source="startTime" />
      <NumberInput source="week" />
      <SelectInput source="visTeam" choices={teamChoices} />
      <SelectInput source="homeTeam" choices={teamChoices} />
    </SimpleForm>
  </Edit>
);

export default GameEdit;
