import React from "react";
import { Edit, SimpleForm, TextInput, NumberInput } from "react-admin";

const TeamEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <NumberInput source="numOfWin" />
      <NumberInput source="numOfLoss" />
      <NumberInput source="numOfTie" />
    </SimpleForm>
  </Edit>
);

export default TeamEdit;
