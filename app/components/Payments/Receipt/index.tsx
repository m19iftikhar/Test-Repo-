"use client"

import Image from "next/image";
import style from "./index.module.scss";
import { getApiData } from "@/app/Utility/apiFunctions";
import { useState } from "react";
import Spinner from "../../Spinner";





const Receipt = (params: any) => {
  const [loading, setLoading] = useState(false)
  // console.log(params)
  const viewReceipt = async () => {
    setLoading(true)
    try {
      const data = {
        version: "1",
        path: "v1/Payment",
        endpoint: "download-payment-reciept",
        queryParams: {
          recieptName: params?.data?.receipt,
        },
        returnType: 'blob', // Specify that we want a Blob response
      };

      // Fetch the receipt data as a Blob
      const IncomingData = await getApiData(data);

      // Create a URL for the Blob
      const url = URL.createObjectURL(IncomingData); // Make sure IncomingData is a Blob
      console.log("Blob URL:", url);

      if (url) {
        // Create a link element and trigger a download
        const link = document.createElement('a');
        link.href = url; // The URL of the receipt
        link.download = params?.data?.receipt || 'receipt.png'; // Name for the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the Blob URL after use
        URL.revokeObjectURL(url);
      } else {
        console.error("Receipt URL not found.");
      }

    } catch (err) {
      console.error("An error occurred:", err);
    }
    setLoading(false)
  };

  if (params?.data?.receipt){
    return (
      <button
        className={style.wrapper}
        disabled={loading}
        onClick={() => {
          viewReceipt()
        }}
      >
        {loading ?
          <>
            Downloading
            <Spinner className="sm" />
          </>
          :
          <>
            View Receipt
            <Image
              src={"/assets/svgs/exclamation.svg"}
              alt="exclamation"
              width={20}
              height={20}
            />
          </>
        }
      </button>
    );
  }else{
    return(
      <span>
        -
      </span>
    )
  }

   
};

export default Receipt;
