import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Automatically infer messagingSenderId from appId (1:PROJECT_NUMBER:web:...) if omitted
if (!firebaseConfig.messagingSenderId && firebaseConfig.appId?.includes(':')) {
  firebaseConfig.messagingSenderId = firebaseConfig.appId.split(':')[1]
}

// Required keys for Firebase client authentication & database
const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'appId'] as const
const isFirebaseConfigured = requiredKeys.every((key) => {
  const value = firebaseConfig[key]
  return Boolean(value && value !== 'undefined')
})

let app: any = null
let db: any = null
let auth: any = null
let storage: any = null

if (isFirebaseConfigured) {
  try {
    // Initialize Firebase (avoid duplicate initialization)
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
    
    // Initialize Firebase services
    db = getFirestore(app)
    auth = getAuth(app)
    storage = getStorage(app)
  } catch (error) {
    console.error('Firebase initialization failed:', error)
  }
} else {
  console.warn('Firebase configuration incomplete. Please check your environment variables.')
  console.warn('Missing required variables:', requiredKeys
    .filter((key) => !firebaseConfig[key] || firebaseConfig[key] === 'undefined')
  )
}

export { db, auth, storage }
export default app
