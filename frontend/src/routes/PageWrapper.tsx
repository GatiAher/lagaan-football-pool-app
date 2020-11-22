import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Container from "@material-ui/core/Container";

import UserNotRegistered from "./UserNotRegistered";

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
  const [isRegisteredUser, setIsRegisteredUser] = useState(true);

  useEffect(() => {
    api.user
      .getOne(user.sub)
      .then(() => {
        setIsRegisteredUser(true);
      })
      .catch(() => {
        setIsRegisteredUser(false);
      });
  }, [user.sub]);

  if (isRegisteredUser) {
    return <div>{children}</div>;
  }
  return <UserNotRegistered />;
};

type PageWrapperProps = PageHeaderProps & { isPrivate?: boolean };

const PageWrapper: React.FC<PageWrapperProps> = ({
  heading,
  isPrivate,
  children,
}) => {
  if (children === undefined || children === null) {
    return <Box>ERROR: PageWrapper Children do not exist</Box>;
  }
  if (heading === "Home") {
    return <div>{children}</div>;
  }
  if (isPrivate) {
    return (
      <Container maxWidth="md">
        <PageHeader heading={heading} />
        <PrivatePageContent>{children}</PrivatePageContent>
      </Container>
    );
  }
  return (
    <Container maxWidth="md">
      <PageHeader heading={heading} />
      <div>{children}</div>
    </Container>
  );
};

export default PageWrapper;
