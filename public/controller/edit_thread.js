import * as FirebaseController from './firebase_controller.js'
import * as Util from '../viewpage/util.js'
import * as Constant from '../model/constant.js'
import * as Element from '../viewpage/element.js'
import { Thread } from '../model/thread.js'


export function addEventListeners() {

}

export async function edit_thread(threadId) {
    let thread
    try {
        thread = await FirebaseController.getOneThread(threadId);
        if (!thread) {
            Util.info('getThread error', 'No thread found');
            return
        }
    } catch (e) {
        if (Constant.DEV) console.log(e);
        Util.info('getThread error', JSON.stringify(e));
        return;
    }

    Element.formEditThread.form.threadId.value = thread.threadId;
    Element.formEditThread.form.title.value = thread.title;
    Element.formEditThread.form.keywords.value = thread.keywordsArray;
    Element.formEditThread.form.content.value = thread.content;
    Element.modalEditThread.show();

}

export async function delete_thread(threadId) {

}