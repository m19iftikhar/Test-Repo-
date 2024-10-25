import Image from "next/image";

export const requiredValidation: any = (
  <>
    <span>
      <Image
        src={"/assets/svgs/error-icon.svg"}
        width={16}
        height={16}
        alt="error"
      />
    </span>
    <span>This is a required field. </span>
  </>
);

export const dateFormatter: any = (dateProv) => {
  const dateStr = dateProv;
  const date = new Date(dateStr);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const emailValidation: any = (
  <>
    <span>
      <Image
        src={"/assets/svgs/error-icon.svg"}
        width={16}
        height={16}
        alt="error"
      />
    </span>
    <span>Please enter valid email</span>
  </>
);

export const passwordMatchValidation: any = (
  <>
    <span>
      <Image
        src={"/assets/svgs/error-icon.svg"}
        width={16}
        height={16}
        alt="error"
      />
    </span>
    <span>Passwords must match </span>
  </>
);

export const primaryEmailValidation: any = (
  <>
    <span>
      <Image
        src={"/assets/svgs/error-icon.svg"}
        width={16}
        height={16}
        alt="error"
      />
    </span>
    <span>Both Emails must be different</span>
  </>
);

export const negativeValueValidation: any = (
  <>
    <span>
      <Image
        src={"/assets/svgs/error-icon.svg"}
        width={16}
        height={16}
        alt="error"
      />
    </span>
    <span>Value must be at least 1</span>
  </>
);

export const mustBeAValidNumber: any = (
  <>
    <span>
      <Image
        src={"/assets/svgs/error-icon.svg"}
        width={16}
        height={16}
        alt="error"
      />
    </span>
    <span>Value must be at least 1</span>
  </>
);
