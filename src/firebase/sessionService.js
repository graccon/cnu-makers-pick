import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './config'

export async function createTestSession(uid) {
  const sessionRef = doc(collection(db, 'sessions'))

  await setDoc(sessionRef, {
    sessionId: sessionRef.id,
    uid,
    startedAt: serverTimestamp(),
    spinCount: 0,
    surveyCompleted: false,
  })

  return sessionRef.id
}
