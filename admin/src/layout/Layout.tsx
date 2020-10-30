import * as React from "react";

import { Layout } from "react-admin";
import AppBar from "./AppBar";

export default (props: any) => {
  return <Layout {...props} appBar={AppBar} />;
};
