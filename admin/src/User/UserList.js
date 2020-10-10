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
  NumberInput
} from "react-admin";

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search First Name" source="firstName" alwaysOn />
    <TextInput label="Search Last Name" source="lastName" />
    <TextInput label="Search Username" source="username" />
    <NumberInput label="Search By Wins" source="numOfWin" />
    <NumberInput label="Search By Losses" source="numOfLoss" />
    <NumberInput label="Search By Ties" source="numOfTie" />
  </Filter>
);

const UserList = (props) => (
  <List filters={<UserFilter />} {...props}>
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
