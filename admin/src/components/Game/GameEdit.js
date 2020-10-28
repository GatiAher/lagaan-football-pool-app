import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
} from "react-admin";
import teamChoices from "../../utils/team-choices";

const GameEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput
        source="startTime"
        helperText="use format YYYY-MM-DD hh:mm _M, 12-hour time"
      />
      <NumberInput source="week" />
      <SelectInput source="visTeam" choices={teamChoices} />
      <SelectInput source="homeTeam" choices={teamChoices} />
    </SimpleForm>
  </Edit>
);

export default GameEdit;
