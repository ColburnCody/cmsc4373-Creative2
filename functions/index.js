const functions = require("firebase-functions");

const admin = require("firebase-admin");

const serviceAccount = require("./account_key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const Constant = require('./constant.js')

exports.cf_updateThread = functions.https.onCall(updateThread);

async function updateThread(threadInfo, context) {
    try {
        await admin.firestore().collection(Constant.collectionNames.THREADS).doc(threadInfo.threadId).updateThread(threadInfo.data);
    } catch (e) {
        if (Constant.DEV) console.log(e);
        throw new functions.https.HttpsError('internal', 'updateThread failed');
    }
}

