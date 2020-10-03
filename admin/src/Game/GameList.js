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

const GameFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search Week" source="week" alwaysOn />
    <TextInput label="Search Visiting Team" source="visTeam" />
    <TextInput label="Search Home Team" source="homeTeam" />
  </Filter>
);

const GameList = (props) => (
  <List filters={<GameFilter />} {...props}>
    <Datagrid>
      <NumberField source="week" />
      <TextField source="visTeam" />
      <TextField source="visStatus" />
      <TextField source="homeTeam" />
      <TextField source="homeStatus" />
      <DateField source="updated_at" />
      <EditButton />
    </Datagrid>
  </List>
);

export default GameList;