import React from "react";
import { Create, SimpleForm, TextInput, NumberInput } from "react-admin";

const TeamCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <NumberInput source="numOfWin" />
      <NumberInput source="numOfLoss" />
      <NumberInput source="numOfTie" />
    </SimpleForm>
  </Create>
);

export default TeamCreate;
