import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

const GameEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
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
  </Edit>
);

export default GameEdit;
