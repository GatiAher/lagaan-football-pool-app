import React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  EditButton,
  Filter,
  TextInput,
} from "react-admin";

const TeamFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search Team Abbreviation" source="id" alwaysOn />
  </Filter>
);

const TeamList = (props) => (
  <List filters={<TeamFilter />} {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="fullName" />
      <NumberField source="numOfWin" />
      <NumberField source="numOfLoss" />
      <NumberField source="numOfTie" />
      <DateField source="updated_at" />
      <EditButton />
    </Datagrid>
  </List>
);

export default TeamList;
