import { GoogleSvg } from '@/assets/icons/google'

export const GoogleAuthButton = () => {
  const loginGoogle = () => {
    //TODO спрятать в env
    window.location.href = process.env.NEXT_PUBLIC_GOOGLE_URL_LOCALHOST!
  }

  return (
    <button onClick={loginGoogle} type={'button'}>
      <GoogleSvg />
    </button>
  )
}
