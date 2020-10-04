import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

const GameCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="id" />
      <NumberInput source="startTime" />
      <NumberInput source="week" />
      <NumberInput source="season" />
      <ReferenceInput
        source="visTeam"
        reference="team"
        perPage="35"
        sort={{ field: "id", order: "ASC" }}
      >
        <SelectInput optionText="id" />
      </ReferenceInput>
      <NumberInput source="visPts" />
      <TextInput source="visStatus" />
      <ReferenceInput
        source="homeTeam"
        reference="team"
        perPage="35"
        sort={{ field: "id", order: "ASC" }}
      >
        <SelectInput optionText="id" />
      </ReferenceInput>
      <NumberInput source="homePts" />
      <TextInput source="homeStatus" />
    </SimpleForm>
  </Create>
);

export default GameCreate;
