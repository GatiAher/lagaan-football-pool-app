import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
} from "react-admin";

import teamChoices from "../../selection-options/team-choices";

const GameEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <NumberInput source="week" helperText="enter number between 1-21" />
      <SelectInput source="visTeam" choices={teamChoices} />
      <SelectInput source="homeTeam" choices={teamChoices} />
      <TextInput
        source="startTime"
        helperText="use format YYYY-MM-DD hh:mm _M, 12-hour time"
      />
    </SimpleForm>
  </Edit>
);

export default GameEdit;
