import React from "react";
import { UserProvider } from "../Providers/UserProvider";
import Toolbar from "./OverviewToolbar";
import OverviewProvider from "../Providers/OverviewProvider"; // Update the import
import Header from "./OverviewHeader";

function Overview() {
  return (
    <UserProvider>
      <OverviewProvider>
        <Header />
        <Toolbar />
      </OverviewProvider>
    </UserProvider>
  );
}

export default Overview;
