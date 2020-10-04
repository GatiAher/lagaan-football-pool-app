import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  DateInput,
} from "react-admin";

const GameCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="id" />
      <DateInput source="startTime" />
      <NumberInput source="week" />
      <ReferenceInput
        source="visTeam"
        reference="team"
        perPage="35"
        sort={{ field: "id", order: "ASC" }}
      >
        <SelectInput optionText="id" />
      </ReferenceInput>
      <ReferenceInput
        source="homeTeam"
        reference="team"
        perPage="35"
        sort={{ field: "id", order: "ASC" }}
      >
        <SelectInput optionText="id" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export default GameCreate;
