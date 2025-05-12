import { GoogleSvg } from '@/assets/icons/google'

export const GoogleAuthButton = () => {
  const loginGoogle = () => {
    //TODO спрятать в env
    window.location.href =
      'https://accounts.google.com/o/oauth2/v2/auth?client_id=272583913867-t74i019ufdvmarh05jlv8bcu1ak0a6o6.apps.googleusercontent.com&redirect_uri=https://dang-inc-project.uk&response_type=code&scope=profile%20email'
  }

  return (
    <button onClick={loginGoogle} type={'button'}>
      <GoogleSvg />
    </button>
  )
}
