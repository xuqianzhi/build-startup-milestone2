import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDx0Mevlnf4oDjDYidM2EzkOiOpXHoiZBo",
    authDomain: "xqz-cs5356.firebaseapp.com",
    projectId: "xqz-cs5356",
    storageBucket: "xqz-cs5356.appspot.com",
    messagingSenderId: "748563665138",
    appId: "1:748563665138:web:8a7fbbfcecedf8a0b0006b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app }