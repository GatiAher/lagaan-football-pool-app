import * as React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import DangerButton from "./DangerButton";
import NormalButton from "./NormalButton";

type ButtonTypeI = {
  type?: "danger" | "normal";
  onClick: () => void;
};

const DisplayButton: React.FC<ButtonTypeI> = ({ type, onClick, children }) => {
  if (type === "danger") {
    return (
      <DangerButton variant="outlined" onClick={onClick}>
        {children}
      </DangerButton>
    );
  }
  return (
    <NormalButton variant="outlined" onClick={onClick}>
      {children}
    </NormalButton>
  );
};

type SettingsOptionViewI = {
  primaryText: string;
  secondaryText: string;
} & ButtonTypeI;

const SettingsOptionView = ({
  primaryText,
  secondaryText,
  type,
  onClick,
}: SettingsOptionViewI) => {
  return (
    <ListItem>
      <ListItemText primary={primaryText} secondary={secondaryText} />
      <ListItemSecondaryAction>
        <DisplayButton type={type} onClick={onClick}>
          {primaryText}
        </DisplayButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SettingsOptionView;
