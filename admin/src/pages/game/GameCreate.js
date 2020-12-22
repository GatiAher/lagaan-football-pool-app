import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
} from "react-admin";
import { required, minValue, maxValue, number, regex } from "react-admin";

import teamChoices from "../../selection-options/team-choices";
import days from "../../selection-options/days";

const GameCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <NumberInput
        source="week"
        helperText="enter number between 1-21"
        validate={[required(), number(), minValue(1), maxValue(21)]}
      />
      <SelectInput
        source="visTeam"
        choices={teamChoices}
        validate={required()}
      />
      <SelectInput
        source="homeTeam"
        choices={teamChoices}
        validate={required()}
      />
      <TextInput
        source="startTime"
        helperText="use format YYYY-MM-DD hh:mm _M, 12-hour time"
        validate={[
          required(),
          regex(
            /^[0-9]{4}-[0-1][0-9]-[0-3][0-9] [0-1][0-9]:[0-5][0-9] [A|P][M]$/,
            "use format YYYY-MM-DD hh:mm _M, 12-hour time"
          ),
        ]}
      />
      <SelectInput
        source="pickWindowDay"
        choices={days}
        helperText="(OPTIONAL)"
      />
      <NumberInput
        source="pickWindowHour"
        helperText="(OPTIONAL) enter number between 1-23"
        validate={[number(), minValue(1), maxValue(23)]}
      />
    </SimpleForm>
  </Create>
);

export default GameCreate;
