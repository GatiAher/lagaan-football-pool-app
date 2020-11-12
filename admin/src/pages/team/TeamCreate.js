import React from "react";
import { Create, SimpleForm, TextInput, SelectInput } from "react-admin";

import { teamWeeks } from "../../selection-options/weeks";
import teamStatuses from "../../selection-options/team-statuses";

const TeamCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="id" helperText="team abbreviation in caps" />
      <TextInput source="mascotName" />
      <TextInput source="fullName" />
      {teamWeeks.map((weekId) => (
        <SelectInput source={weekId} choices={teamStatuses} />
      ))}
    </SimpleForm>
  </Create>
);

export default TeamCreate;
