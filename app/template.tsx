"use client";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import "ag-grid-enterprise";
// import { LicenseManager } from "ag-grid-enterprise";
import NextAuthProvider from "@/Providers/NextAuthProvider";

// LicenseManager.setLicenseKey(
//   "Using_this_{AG_Grid}_Enterprise_key_{AG-069569}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Digital_Gravity_Solution_LLC}_is_granted_a_{Multiple_Applications}_Developer_License_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_need_to_be_licensed_in_addition_to_the_ones_working_with_{AG_Grid}_Enterprise___This_key_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{15_November_2025}____[v3]_[01]_MTc2MzE2NDgwMDAwMA==7f6c7223ab4682288a6572584247da48"
// );

const Template = ({ children }: { children: React.ReactNode }) => {
  // Function to resize fonts based on window width
  const resizeWindow = () => {
    if (window) {
      const perc = window.innerWidth / 120;
      if (window.innerWidth > 1200) {
        document.body.style.fontSize = `${perc}px`;
      }
    }
  };

  useEffect(() => {
    // Add resize event listener for font resizing
    resizeWindow();
    window.addEventListener("resize", resizeWindow);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <>
      <Provider store={store}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </Provider>
    </>
  );
};

export default Template;
