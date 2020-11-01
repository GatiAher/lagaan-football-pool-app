import * as React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import DangerButton from "../../components/styled-buttons/DangerButton";
import NormalButton from "../../components/styled-buttons/NormalButton";

type ButtonTypeProps = {
  type?: "danger" | "normal";
  onClick: () => void;
};

const DisplayButton: React.FC<ButtonTypeProps> = ({
  type,
  onClick,
  children,
}) => {
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
} & ButtonTypeProps;

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
