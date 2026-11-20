import { signInAnonymously } from 'firebase/auth'
import { auth } from './config'

let anonymousUserPromise

export function ensureAnonymousUser() {
  if (!anonymousUserPromise) {
    anonymousUserPromise = auth.authStateReady().then(async () => {
      if (auth.currentUser) {
        console.info('[Firebase Auth] uid:', auth.currentUser.uid)
        return auth.currentUser
      }

      const credential = await signInAnonymously(auth)
      console.info('[Firebase Auth] uid:', credential.user.uid)
      return credential.user
    })
  }

  return anonymousUserPromise
}
