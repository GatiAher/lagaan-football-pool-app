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

import { ListActions } from "../import-csv/ListActions";

const GameFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search Week" source="week" alwaysOn />
  </Filter>
);

const GameList = (props) => (
  <List {...props} filters={<GameFilter />} actions={<ListActions />}>
    <Datagrid>
      <NumberField source="week" />
      <DateField source="startTime" />
      <TextField source="visTeam" />
      <TextField source="homeTeam" />
      <DateField source="updated_at" />
      <EditButton />
    </Datagrid>
  </List>
);

export default GameList;
