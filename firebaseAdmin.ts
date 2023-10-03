// import admin from "firebase-admin";
// import { getApps } from "firebase-admin/app";

// // NOTE: To create a service account key go to Project Setting, Service Accounts
// const serviceAccount = JSON.parse(
//   process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
// );


// // NOTE: With this now we can manipulate our DB from the Backend
// if(!getApps().length){
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   })
// };

// const adminDb = admin.firestore();

// export { adminDb };


import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

initializeApp({
  credential: cert(serviceAccount!)
});

const adminDb = getFirestore();

export { adminDb };