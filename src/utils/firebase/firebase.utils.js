import { initializeApp } from 'firebase/app'

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { useRevalidator } from 'react-router-dom'

const firebaseConfig = {
  apiKey: 'AIzaSyDobmwnTc63lEf8_giKrz-9mqA0Ntd3Avs',
  authDomain: 'crwn-clothing-db-902ff.firebaseapp.com',
  projectId: 'crwn-clothing-db-902ff',
  storageBucket: 'crwn-clothing-db-902ff.appspot.com',
  messagingSenderId: '114151986034',
  appId: '1:114151986034:web:8bed815363b3f5f77bc3eb'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore() // get database from fire store

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return

  const userDocRef = doc(db, 'users', userAuth.uid) // get the document reference from the unique id from user if it exist

  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef) // to check user exist in db and access the data

  // doesn't exist -> true, this will create new user into database if user doesn't exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createAt = new Date() // when user sign in

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}
