import React from "react";
import { UserProvider } from "../Providers/UserProvider";
import Toolbar from "./OverviewToolbar";
import OverviewProvider from "../Providers/OverviewProvider";
import Header from "./OverviewHeader";

function Overview() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserProvider>
        <OverviewProvider>
          <div style={{ textAlign: "center" }}>
            <Header />
            <Toolbar />
          </div>
        </OverviewProvider>
      </UserProvider>
    </div>
  );
}

export default Overview;
