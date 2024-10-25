import React, { Fragment, useState } from "react";
import style from "./dropzoneFiled.module.scss";
import { useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";
import Image from "next/image";

const DropzoneField = (props: any) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange } }) => {
        return (
          <Dropzone
            setValue={props.setValue}
            multiple={props.multiple}
            req={props.req}
            vertical={props.vertical}
            label={props.label}
            onChange={(e: any) => {
              onChange(props.multiple ? e : e[0]);
              console.log(e, "acceptedFiles");
            }}
            accept={props?.accept}
            value={props.value}
            name={props.name}
            setdropzoneData={props.setdropzoneData}
            bottomLabel={props.bottomLabel}
            maxLimit={props.maxLimit}
            maxLimitMessage={props.maxLimitMessage}
          />
        );
      }}
    />
  );
};

type dropzoneProps = {
  multiple?: boolean;
  onChange?: any;
  value?: any;
  label?: string;
  vertical?: boolean;
  accept?: any;
  req?: boolean;
  name?: any;
  setdropzoneData?: any;
  setValue?: any;
  bottomLabel?: string;
  maxLimit?: any;
  maxLimitMessage?: any;
};
const Dropzone = ({
  multiple,
  onChange,
  label,
  value,
  req,
  name,
  accept,
  setdropzoneData,
  setValue,
  bottomLabel,
  maxLimit,
  maxLimitMessage,
}: dropzoneProps) => {
  const [files, setFiles] = useState<any>([]);
  const [base64Files, setBase64Files] = useState<any>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  console.log(maxLimit, "maxLimit");

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: accept,
    maxSize: maxLimit, // 2MB size limit
    multiple,
    onDrop: (acceptedFiles) => {
      convertFilesToBase64(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    onDropRejected: (rejectedFiles) => {
      setErrorMsg(maxLimitMessage); // Set error message
      console.log("Rejected files due to size:", rejectedFiles);
    },
  });

  // Convert files to Base64
  const convertFilesToBase64 = (files: any) => {
    const promises = files.map((file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(promises)
      .then((base64Results) => {
        setBase64Files(base64Results);
        onChange(base64Results); // Send base64 files to parent
      })
      .catch((error) => console.error("Error converting to Base64:", error));
  };

  // Remove File
  const remove = (file: any) => {
    acceptedFiles?.splice(file, 1);
    onChange(acceptedFiles);
    setBase64Files((prevFiles: any) =>
      prevFiles.filter((_: any, i: number) => i !== file)
    );
  };

  return (
    <>
      <div className={`${style.inputFileContainer} `}>
        <label className="fw-600 dropzoneLabel ">
          {label}
          {req && <span className={style.required}> *</span>}
        </label>
        <div>
          {acceptedFiles?.length == 0 ? (
            <div {...getRootProps()}>
              <input {...getInputProps({ onChange })} />
              <div
                className={`${style.inputFileWrapper} dropzoneInputFileWrapper`}
              >
                <div className={style.iconWrapper}>
                  <Image
                    src="/assets/svgs/drag.svg"
                    width={30}
                    height={30}
                    alt="icon"
                  />
                </div>
                <h5 className="secondary-col mb-0 fw-400">
                  Drop your Receipt here
                </h5>
              </div>
              {bottomLabel && (
                <h6 className={style.bottomLabel}>{bottomLabel}</h6>
              )}
            </div>
          ) : (
            <ul className={style.uploadedFiles}>
              {files.map((file: any, i: number) => (
                <Fragment key={i}>
                  <li className={style.fileItem}>
                    <div className={style.previewImg}>
                      <Image
                        src={file.preview}
                        fill
                        alt="img"
                        onLoad={() => {
                          URL.revokeObjectURL(file.preview);
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      className={style.removeItem}
                      onClick={() => remove(i)}
                    >
                      <Image
                        src={"/assets/svgs/trash-white.svg"}
                        width={22}
                        height={22}
                        alt="icon"
                      />
                    </button>
                  </li>
                </Fragment>
              ))}
            </ul>
          )}
          {errorMsg && (
            <p style={{ color: "red", fontSize: "1em" }}>{errorMsg}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DropzoneField;
