"use client";

import {useEffect} from "react";
import {redirect} from "next/navigation";

const BillingsAndPayments = () => {
  useEffect(() => {
    redirect("/billing-and-payments/payments");
  });

  return <div></div>;
};

export default BillingsAndPayments;
