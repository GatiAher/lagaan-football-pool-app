import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="username" />
      <TextInput source="id" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="rank" />
      <NumberInput source="score" />
      {[
        "wk1A",
        "wk1B",
        "wk2A",
        "wk2B",
        "wk3A",
        "wk3B",
        "wk4A",
        "wk4B",
        "wk5A",
        "wk5B",
        "wk6A",
        "wk6B",
        "wk7A",
        "wk7B",
        "wk8A",
        "wk8B",
        "wk9A",
        "wk9B",
        "wk10A",
        "wk10B",
        "wk11A",
        "wk11B",
        "wk12A",
        "wk12B",
        "wk13A",
        "wk13B",
        "wk14A",
        "wk14B",
        "wk15A",
        "wk15B",
        "wk16A",
        "wk16B",
        "wk17A",
        "wk17B",
      ].map((teamSelectionWeek) => (
        <ReferenceInput
          source={teamSelectionWeek}
          reference="team"
          perPage="35"
          sort={{ field: "id", order: "ASC" }}
        >
          <SelectInput optionText="id" />
        </ReferenceInput>
      ))}
    </SimpleForm>
  </Create>
);

export default UserCreate;
