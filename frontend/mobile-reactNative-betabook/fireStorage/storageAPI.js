
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: 'AIzaSyAbEimzHSXmGQ3r8ATwztTUe_feP7HwLTQ',
  storageBucket: 'gs://betabook-58b08.appspot.com'
};
export const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
