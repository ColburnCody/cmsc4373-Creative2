const functions = require("firebase-functions");

const admin = require("firebase-admin");

const serviceAccount = require("./account_key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const Constant = require('./constant.js');


exports.cf_updateThread = functions.https.onCall(updateThread);
exports.cf_deleteThread = functions.https.onCall(deleteThread);
exports.cf_deleteUser = functions.https.onCall(deleteUser);

async function deleteUser(data, context) {
    if (!context.auth.token.email) {
        if (Constant.DEV) console.log('Not allowed');
        throw new functions.https.HttpsError('unauthenticated', 'User does not have the authentication for this action');
    }
    try {
        await admin.auth().deleteUser(data);
    } catch (e) {
        if (Constant.DEV) console.log(e);
        throw new functions.https.HttpsError('internal', 'deleteUser failed');
    }
}


async function updateThread(threadInfo, context) {
    if (!context.auth.token.email) {
        if (Constant.DEV) console.log('Not allowed');
        throw new functions.https.HttpsError('unauthenticated', 'User does not have the authentication for this action');
    }

    try {
        await admin.firestore().collection(Constant.collectionNames.THREADS).doc(threadInfo.threadId).update(threadInfo.data);
    } catch (e) {
        if (Constant.DEV) console.log(e);
        throw new functions.https.HttpsError('internal', 'updateThread failed');
    }
}

async function deleteThread(threadId, context) {
    if (!context.auth.token.email) {
        if (Constant.DEV) console.log('Not allowed');
        throw new functions.https.HttpsError('unauthenticated', 'User does not have the authentication for this action');
    }
    try {
        await admin.firestore().collection(Constant.collectionNames.THREADS).doc(threadId).delete();
    } catch (e) {
        if (Constant.DEV) console.log(e);
        throw new functions.https.HttpsError('internal', 'deleteThread failed');
    }
}

