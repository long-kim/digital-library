export const firebaseServerCredentials = {
  type: "service_account",
  project_id: "digital-library-bbe80",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email:
    "firebase-adminsdk-vezsc@digital-library-bbe80.iam.gserviceaccount.com",
  client_id: "117997160949360858957",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vezsc%40digital-library-bbe80.iam.gserviceaccount.com"
};
