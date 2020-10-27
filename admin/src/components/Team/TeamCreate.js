import React from "react";
import { Create, SimpleForm, TextInput, SelectInput } from "react-admin";
import weeks from "../weeks";

const TeamCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
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
  </Create>
);

export default TeamCreate;
