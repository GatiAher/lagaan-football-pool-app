import React from "react";
import { Edit, SimpleForm, TextInput, SelectInput } from "react-admin";

import weeks from "../../selection-options/weeks";
import teamStatuses from "../../selection-options/team-statuses"

const TeamEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="mascotName" />
      <TextInput source="fullName" />
      {weeks.map((weekId) => (
        <SelectInput
          source={weekId}
          choices={teamStatuses}
        />
      ))}
    </SimpleForm>
  </Edit>
);

export default TeamEdit;
