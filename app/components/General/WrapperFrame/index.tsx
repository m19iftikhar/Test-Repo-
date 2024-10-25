import ArrowButton from "../Buttons/ArrowButton";
import style from "./wrapperFrame.module.scss";

export interface WrapperFrameProps {
  children: React.ReactNode;
  title: string;
  ctaTitle?: string;
  ctaLink?: string;
  noBg?: boolean;
  hidePX?: boolean;
  topCta?: boolean;
  customClass?: string;
  titleSpaceLg?: boolean;
}

const WrapperFrame = ({
  children,
  title,
  ctaTitle,
  ctaLink,
  noBg,
  hidePX,
  topCta,
  customClass,
  titleSpaceLg,
}: WrapperFrameProps) => {
  return (
    <div className={style.wrapper}>
      <h3 className={`${style.title} ${titleSpaceLg ? style.lg : ""}`}>
        {title}
      </h3>
      <div
        className={`${style.children} ${customClass || ""} ${
          noBg ? style.noBg : ""
        } ${hidePX ? style.hidePX : ""}`}>
        {children}
        {ctaTitle && ctaLink && (
          <div
            className={`${style.linkWrapper} ${topCta ? style.top__link : ""}`}>
            <ArrowButton link={ctaLink} title={ctaTitle} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WrapperFrame;
