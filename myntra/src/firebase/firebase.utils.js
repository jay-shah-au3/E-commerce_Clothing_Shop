import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCOFIzVUsJ3tlEGITCpzju2GztRgvTXfwI",
    authDomain: "myntra-db.firebaseapp.com",
    databaseURL: "https://myntra-db.firebaseio.com",
    projectId: "myntra-db",
    storageBucket: "myntra-db.appspot.com",
    messagingSenderId: "742257728100",
    appId: "1:742257728100:web:ed4defa22bd15a1f035d71",
    measurementId: "G-MFJ0Q4RXWC"
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additonalData) => {
    if(!userAuth)
        return;
    const userRef = firestore.doc(`/users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additonalData
            })
        }
        catch(error){
            console.log("error creating user", error.message);
        }
    }
    return userRef;
} 

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map( doc => {
        const {title, items} = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id:doc.id,
            items
        }
    });
    // console.log(transformedCollection);
    return transformedCollection.reduce( (accumulator, collection)=> {
        accumulator[collections.title.toLowerCase()] = collection;
        return accumulator;
    }, {} )
}


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,obj);
    });
    await batch.commit();
    
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({'prompt':'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
