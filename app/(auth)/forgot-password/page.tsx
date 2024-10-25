import ForgotPasswordForm from '@/app/components/Forms/ForgotPasswordForm'
import TwoColTemplate from '@/app/components/General/TwoColTemplate'

const ForgotPassword = () => {
  return (
    <TwoColTemplate
      videoSrc={'/assets/videos/banner-video.mp4'}
      logoSrc={'/assets/svgs/brand-logo.svg'}
      formTitle={'Forgot Password?'}
      formDesc={`Please provide your account's email address. To reset your password, we will email you an OTP verification`}
    >
      <ForgotPasswordForm />
    </TwoColTemplate>
  )
}

export default ForgotPassword
