const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL } = require("firebase/storage");

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const getImage = async (img_URL) => {
  const img = ref(storage,img_URL)

  try {
    const downloadURL = await getDownloadURL(img);
    return downloadURL;

  } catch (error) {
    throw error;
  }
}


module.exports={
    getImage
};