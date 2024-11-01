import React from "react";
import { UserProvider } from "../Providers/UserProvider";
import Toolbar from "./OverviewToolbar";
import OverviewProvider from "../Providers/OverviewProvider";
import Header from "./OverviewHeader";

function Overview() {
  return (
    <UserProvider>
      <OverviewProvider>
        <div style={{ textAlign: "center" }}>
          <Header />
          <Toolbar />
        </div>
      </OverviewProvider>
    </UserProvider>
  );
}

export default Overview;
