import Image from 'next/image'
import style from './twoColTemplate.module.scss'
export interface TwoColTemplateProps {
  children?: string | JSX.Element | JSX.Element[]
  videoSrc: string
  logoSrc: string
  formTitle?: string
  formDesc?: string
}

const TwoColTemplate = ({
  children,
  videoSrc,
  logoSrc,
  formTitle,
  formDesc,
}: TwoColTemplateProps) => {
  return (
    <div className={`${style.twoColTemplate}  custom-row no-gutters`}>
      <div className={`${style.left__col}  col_12 col_xl_6`}>
        <div className={`${style.left__colWrapper}`}>
          {logoSrc && (
            <div className={`${style.logoWrapper}`}>
              <Image src={logoSrc} alt="Logo" width={75} height={75} />
            </div>
          )}

          <div className={`${style.formTitle}`}>
            {formTitle && <h1 className="h1">{formTitle}</h1>}
            {formDesc && <p className={`${style.desc} p`}>{formDesc}</p>}
          </div>
          {children}
        </div>
      </div>

      <div className={`${style.right__col}  col_12 col_xl_6`}>
        <video className="img-hack" autoPlay muted loop={true}>
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

export default TwoColTemplate
