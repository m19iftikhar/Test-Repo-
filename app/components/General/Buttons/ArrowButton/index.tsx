import Image from 'next/image'
import style from './arrowButton.module.scss'
import Link from 'next/link'

interface arrowBtnProps {
  link: string
  title: string
}

const ArrowButton = ({ link, title }: arrowBtnProps) => {
  return (
    <Link href={link} className={style.wrapper}>
      <span className={style.title}>{title}</span>
      <Image
        src={'/assets/svgs/button-arrow.svg'}
        width={20}
        height={20}
        alt="arrow"
      />
    </Link>
  )
}

export default ArrowButton
