import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyCTsKK3BV07WMIUAVcBc7np4lB4y4AmHdM',
  authDomain: 'moviesnet-a08c6.firebaseapp.com',
  projectId: 'moviesnet-a08c6',
  storageBucket: 'moviesnet-a08c6.appspot.com',
  messagingSenderId: '305109045459',
  appId: '1:305109045459:web:8c1ee5a4188ea3f22e4426',
  measurementId: 'G-GVHX29QFDD'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
