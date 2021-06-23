import * as Auth from '../controller/auth.js'
import * as Element from './element.js'
import * as Route from '../controller/route.js'
import * as Util from './util.js'
import * as FirebaseController from '../controller/firebase_controller.js'
import * as Constant from '../model/constant.js'

export function addEventListeners() {
    Element.menuUser.addEventListener('click', () => {
        history.pushState(null, null, Route.routePath.USER);
        user_page();
    })
}

export function user_page() {
    if (!Auth.currentUser) {
        Element.root.innerHTML = '<h1>Access not allowed</h1>'
        return;
    }
    Element.root.innerHTML = `
    <h1>Welcome, ${Auth.currentUser.email}</h1>
    <div>
    <button id="button-delete-account" class="btn btn-outline-danger">Delete account</button>
    </div>
    `;

    document.getElementById('button-delete-account').addEventListener('click', async () => {
        if (!window.confirm("Are you sure you want to delete your account?")) {
            return;
        }
        const uid = Auth.currentUser.uid;
        try {
            await FirebaseController.deleteUser(uid);
            window.location.reload();
            Util.info('Account deleted', 'Your account has been deleted');
        } catch (e) {
            if (Constant.DEV) console.log(e);
            Util.info('Delete user error', JSON.stringify(e));
        }
    })

}