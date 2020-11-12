import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
} from "react-admin";

import teamChoices from "../../selection-options/team-choices";

const GameCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <NumberInput source="week" />
      <SelectInput source="visTeam" choices={teamChoices} />
      <SelectInput source="homeTeam" choices={teamChoices} />
      <TextInput
        source="startTime"
        helperText="use format YYYY-MM-DD hh:mm _M, 12-hour time"
      />
    </SimpleForm>
  </Create>
);

export default GameCreate;
