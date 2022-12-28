import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, Firestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyA-JmK1sJLcuvrmaoS34ZMYLa-jWny-KV4",
    authDomain: "crwn-clothing-db-c2290.firebaseapp.com",
    projectId: "crwn-clothing-db-c2290",
    storageBucket: "crwn-clothing-db-c2290.appspot.com",
    messagingSenderId: "91845608449",
    appId: "1:91845608449:web:b77ffbc4960434f454ac00"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

      //if user data doesnt exist
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    //if user data exists 
    return userDocRef;
    //return userdocref 
};