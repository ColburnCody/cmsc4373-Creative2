const functions = require("firebase-functions");

const admin = require("firebase-admin");

const serviceAccount = require("./account_key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const Constant = require('./constant.js')

exports.cf_updateThread = functions.https.onCall(updateThread);
exports.cf_deleteThread = functions.https.onCall(deleteThread);

async function updateThread(threadInfo, context) {

    try {
        await admin.firestore().collection(Constant.collectionNames.THREADS).doc(threadInfo.threadId).update(threadInfo.data);
    } catch (e) {
        if (Constant.DEV) console.log(e);
        throw new functions.https.HttpsError('internal', 'updateThread failed');
    }
}

async function deleteThread(threadId, context) {
    try {
        await admin.firestore().collection(Constant.collectionNames.THREADS).doc(threadId).delete();
    } catch (e) {
        if (Constant.DEV) console.log(e);
        throw new functions.https.HttpsError('internal', 'deleteThread failed');
    }
}

