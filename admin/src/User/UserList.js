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

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search First Name" source="firstName" alwaysOn />
    <TextInput label="Search Last Name" source="lastName" />
    <TextInput label="Search Username" source="username" />
  </Filter>
);

const UserList = (props) => (
  <List filters={<UserFilter />} {...props}>
    <Datagrid>
      <TextField source="username" />
      <NumberField source="score" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <DateField source="updated_at" />
      <EditButton />
    </Datagrid>
  </List>
);

export default UserList;
