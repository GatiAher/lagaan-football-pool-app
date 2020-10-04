import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  DateInput,
} from "react-admin";

const GameEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
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
  </Edit>
);

export default GameEdit;
