import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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

const PrivatePageWrapper: React.FC<{}> = ({ children }) => {
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
  return (
    <div>
      <PageHeader heading={heading} />
      {isPrivate ? (
        <PrivatePageWrapper>{children}</PrivatePageWrapper>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default PageWrapper;
