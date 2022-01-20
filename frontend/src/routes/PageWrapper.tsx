import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Container from "@material-ui/core/Container";

import UserNotRegistered from "./UserNotRegistered";

import { useCurrentWeek } from "../contexts/CurrentWeekContext";
import UserNotActive from "./UserNotActive"

import api from "../api";

type PageHeaderProps = {
  heading: string;
};

const PageHeader = ({ heading }: PageHeaderProps) => {
  return (
    <Box pt={4} pb={2}>
      <Typography variant="h4">{heading}</Typography>
    </Box>
  );
};

const PrivatePageContent: React.FC<{}> = ({ children }) => {
  const { user } = useAuth0();
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);

  const { currentWeek } = useCurrentWeek();
  const activeField = currentWeek > 18 ? "activePlayoff" : "active";
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [isActivePlayoffUser, setIsActivePlayoffUser] = useState(false);


  useEffect(() => {
    api.user
      .getOne(user.sub)
      .then((res) => {
        setIsRegisteredUser(true);
        setIsActiveUser(res[0].active);
        setIsActivePlayoffUser(res[0].activePlayoff);
      })
      .catch(() => {
        setIsRegisteredUser(false);
      });
  }, [user.sub]);

  if (isRegisteredUser) {
    if (
      (activeField === "active" && isActiveUser)
      || (activeField === "activePlayoff" && isActivePlayoffUser)
    ) {
      return <div>{children}</div>;
    }
    return <UserNotActive />;
  }
  return <UserNotRegistered />;
};

type PageWrapperProps = PageHeaderProps & {
  isPrivate?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
};

const PageWrapper: React.FC<PageWrapperProps> = ({
  heading,
  maxWidth,
  isPrivate,
  children,
}) => {
  if (children === undefined || children === null) {
    return <Box>ERROR: PageWrapper Children do not exist</Box>;
  }
  if (heading === "Home") {
    return <div>{children}</div>;
  }
  const mw = maxWidth || "md";
  if (isPrivate) {
    return (
      <Container maxWidth={mw}>
        <PageHeader heading={heading} />
        <PrivatePageContent>{children}</PrivatePageContent>
      </Container>
    );
  }
  return (
    <Container maxWidth={mw}>
      <PageHeader heading={heading} />
      <div>{children}</div>
    </Container>
  );
};

export default PageWrapper;
