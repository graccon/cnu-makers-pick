import { useEffect, useState } from 'react'
import './App.css'
import { ensureAnonymousUser } from './firebase/authService'
import { createTestSession } from './firebase/sessionService'
import LandingPage from './pages/LandingPage'

function App() {
  const [user, setUser] = useState(null)
  const [authStatus, setAuthStatus] = useState('익명 로그인 확인 중...')
  const [testStatus, setTestStatus] = useState('')
  const [isTesting, setIsTesting] = useState(false)

  useEffect(() => {
    let isMounted = true

    ensureAnonymousUser()
      .then((authenticatedUser) => {
        if (isMounted) {
          setUser(authenticatedUser)
          setAuthStatus('Firebase 익명 로그인 연결 완료')
        }
      })
      .catch((error) => {
        console.error('[Firebase Auth] 익명 로그인 실패:', error)
        if (isMounted) {
          setAuthStatus(`Firebase 익명 로그인 실패: ${error.message}`)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  async function handleFirebaseTest() {
    if (!user) return

    setIsTesting(true)
    setTestStatus('Firestore 기록 중...')

    try {
      const sessionId = await createTestSession(user.uid)
      console.info('[Firestore] 테스트 session 생성:', sessionId)
      setTestStatus(`Firestore 기록 성공 (sessionId: ${sessionId})`)
    } catch (error) {
      console.error('[Firestore] 테스트 session 생성 실패:', error)
      setTestStatus(`Firestore 기록 실패: ${error.message}`)
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <main>
      <LandingPage />

      <section aria-labelledby="firebase-test-heading">
        <h2 id="firebase-test-heading">개발용 Firebase 연결 확인</h2>
        <p>{authStatus}</p>
        <button
          type="button"
          onClick={handleFirebaseTest}
          disabled={!user || isTesting}
        >
          {isTesting ? '연결 확인 중...' : 'Firebase 연결 테스트'}
        </button>
        {testStatus && <p role="status">{testStatus}</p>}
      </section>
    </main>
  )
}

export default App
