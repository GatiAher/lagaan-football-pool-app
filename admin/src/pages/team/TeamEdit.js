import React from "react";
import { Edit, SimpleForm, TextInput, SelectInput } from "react-admin";

import { teamWeeks } from "../../selection-options/weeks";
import teamStatuses from "../../selection-options/team-statuses";

const TeamEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="mascotName" />
      <TextInput source="fullName" />
      {teamWeeks.map((weekId) => (
        <SelectInput source={weekId} choices={teamStatuses} />
      ))}
    </SimpleForm>
  </Edit>
);

export default TeamEdit;
