interface SpinnerProps {
  className?: string;
}

const Spinner = ({className}: SpinnerProps) => {
  return <div className={`spinner ${className || ""}`}></div>;
};
export default Spinner;
