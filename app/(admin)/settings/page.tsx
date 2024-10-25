"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

const Settings = () => {
  useEffect(() => {
    redirect("/settings/inventory");
  });

  return <div></div>;
};

export default Settings;
