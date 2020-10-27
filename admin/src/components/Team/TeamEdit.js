import React from "react";
import { Edit, SimpleForm, TextInput, SelectInput } from "react-admin";
import weeks from "../weeks";

const TeamEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="mascotName" />
      <TextInput source="fullName" />
      {weeks.map((weekId) => (
        <SelectInput
          source={weekId}
          choices={[
            { id: "win", name: "Win" },
            { id: "loss", name: "Loss" },
            { id: "tie", name: "Tie" },
            { id: "default", name: "Default" },
          ]}
        />
      ))}
    </SimpleForm>
  </Edit>
);

export default TeamEdit;
