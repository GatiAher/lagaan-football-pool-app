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

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search First Name" source="firstName" alwaysOn />
  </Filter>
);

const UserList = (props) => (
  <List {...props} filters={<UserFilter />} actions={<ListActions />}>
    <Datagrid>
      <NumberField source="rank" />
      <TextField source="username" />
      <NumberField source="score" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <NumberField label="Win" source="numOfWin" />
      <NumberField label="Loss" source="numOfLoss" />
      <NumberField label="Tie" source="numOfTie" />
      <DateField source="updated_at" />
      <EditButton />
    </Datagrid>
  </List>
);

export default UserList;
