import * as FirebaseController from './firebase_controller.js'
import * as Util from '../viewpage/util.js'
import * as Constant from '../model/constant.js'
import * as Element from '../viewpage/element.js'
import { Thread } from '../model/thread.js'


export function addEventListeners() {

    Element.formEditThread.form.addEventListener('submit', async e => {
        e.preventDefault();
        const button = e.target.getElementsByTagName('button')[0];
        const label = Util.disableButton(button)

        const title = e.target.title.value.trim();
        const content = e.target.content.value.trim();
        const keywords = e.target.keywords.value.trim();
        const keywordsArray = keywords.toLowerCase().match(/\S+/g);


        const t = new Thread({
            title: title,
            keywordsArray: keywordsArray,
            content: content,
        });
        t.threadId = e.target.threadId.value;

        let valid = true;
        let error = t.validate_title();
        if (error) {
            valid = false;
            Element.formEditThread.errorTitle.innerHTML = error;
        }
        error = t.validate_keywords();
        if (error) {
            valid = false;
            Element.formEditThread.errorKeywords.innerHTML = error;
        }
        error = t.validate_content();
        if (error) {
            valid = false;
            Element.formEditThread.errorContent.innerHTML = error;
        }
        if (!valid) {
            Util.enableButton(button, label)
            return;
        }

        try {
            await FirebaseController.updateThread(t);
            Util.info('Thread has been updated', 'Your thread has been edited successfully', Element.modalEditThread);
        } catch (e) {
            if (Constant.DEV) console.log(e);
            Util.info('Thread update error', JSON.stringify(e), Element.modalEditThread)
        }
        Util.enableButton(button, label);
    })

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