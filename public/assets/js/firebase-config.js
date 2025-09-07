/**
 * MJ Créations - Firebase config (PRODUCTION)
 * NE LAISSE PAS D’AUTRE CODE DANS CE FICHIER.
 * AUCUN initializeApp ICI — les pages l’appellent déjà.
 */
(function () {
  window.MJ_FIREBASE_CONFIG = {
    apiKey: "AIzaSyAY6ceWOZvrHULaYdal-JzDo2zoqL9iPuA",
    authDomain: "mjcreations-system-9675b.firebaseapp.com",
    projectId: "mjcreations-system-9675b",
    // IMPORTANT : c'est .appspot.com (pas .firebasestorage.app)
    storageBucket: "mjcreations-system-9675b.appspot.com",
    appId: "1:1064642497103:web:57b1f621f82741be39b83a",
    // facultatif : gardez-le si Firebase vous le donne
    measurementId: "G-Y86LD0SJSB"
  };

  // Compat facultatif : seulement si vous utilisez des pages Firebase "compat"
  if (window.firebase && !firebase.apps?.length) {
    firebase.initializeApp(window.MJ_FIREBASE_CONFIG);
  }
})();
