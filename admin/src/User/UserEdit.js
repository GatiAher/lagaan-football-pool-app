import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
} from "react-admin";

const UserTitle = ({ record }) => {
  return <span>Editing User {record ? `"${record.username}"` : ""}</span>;
};

const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="id" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="rank" />
      <NumberInput source="score" />
      <TextInput source="wk1A" />
      <TextInput source="wk1B" />
      <TextInput source="wk2A" />
      <TextInput source="wk2B" />
      <TextInput source="wk3A" />
      <TextInput source="wk3B" />
      <TextInput source="wk4A" />
      <TextInput source="wk4B" />
      <TextInput source="wk5A" />
      <TextInput source="wk5B" />
      <TextInput source="wk6A" />
      <TextInput source="wk6B" />
      <TextInput source="wk7A" />
      <TextInput source="wk7B" />
      <TextInput source="wk8A" />
      <TextInput source="wk8B" />
      <TextInput source="wk9A" />
      <TextInput source="wk9B" />
      <TextInput source="wk10A" />
      <TextInput source="wk10B" />
      <TextInput source="wk11A" />
      <TextInput source="wk11B" />
      <TextInput source="wk12A" />
      <TextInput source="wk12B" />
      <TextInput source="wk13A" />
      <TextInput source="wk13B" />
      <TextInput source="wk14A" />
      <TextInput source="wk14B" />
      <TextInput source="wk15A" />
      <TextInput source="wk15B" />
      <TextInput source="wk16A" />
      <TextInput source="wk16B" />
      <TextInput source="wk17A" />
      <TextInput source="wk17B" />
      <TextInput source="sc1A" />
      <TextInput source="sc1B" />
      <TextInput source="sc2A" />
      <TextInput source="sc2B" />
      <TextInput source="sc3A" />
      <TextInput source="sc3B" />
      <TextInput source="sc4A" />
      <TextInput source="sc4B" />
      <TextInput source="sc5A" />
      <TextInput source="sc5B" />
      <TextInput source="sc6A" />
      <TextInput source="sc6B" />
      <TextInput source="sc7A" />
      <TextInput source="sc7B" />
      <TextInput source="sc8A" />
      <TextInput source="sc8B" />
      <TextInput source="sc9A" />
      <TextInput source="sc9B" />
      <TextInput source="sc10A" />
      <TextInput source="sc10B" />
      <TextInput source="sc11A" />
      <TextInput source="sc11B" />
      <TextInput source="sc12A" />
      <TextInput source="sc12B" />
      <TextInput source="sc13A" />
      <TextInput source="sc13B" />
      <TextInput source="sc14A" />
      <TextInput source="sc14B" />
      <TextInput source="sc15A" />
      <TextInput source="sc15B" />
      <TextInput source="sc16A" />
      <TextInput source="sc16B" />
      <TextInput source="sc17A" />
      <TextInput source="sc17B" />
      <DateInput disabled source="created_at" />
      <DateInput disabled source="updated_at" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
