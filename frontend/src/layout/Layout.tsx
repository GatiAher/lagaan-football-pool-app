import React from "react";

import LinearProgress from "@material-ui/core/LinearProgress";

import NavigationBar from "./NavigationBar/NavigationBar";
import { useAuth0 } from "@auth0/auth0-react";

import Footer from "./Footer";

const Layout: React.FC<any> = ({ children }) => {
  const { isLoading } = useAuth0();

  return (
    <div>
      <NavigationBar />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <div
          style={{
            minHeight: "100vh",
            position: "relative",
          }}
        >
          <div style={{ paddingBottom: "100px" }}>{children}</div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
