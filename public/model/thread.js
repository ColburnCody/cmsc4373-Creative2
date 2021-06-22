export class Thread {
    constructor(data) {
        this.uid = data.uid;
        this.email = data.email;
        this.title = data.title;
        this.timestamp = data.timestamp;
        this.content = data.content;
        this.keywordsArray = data.keywordsArray;
    }

    // to store in Firestore
    serialize() {
        return {
            uid: this.uid,
            email: this.email,
            title: this.title,
            timestamp: this.timestamp,
            content: this.content,
            keywordsArray: this.keywordsArray,
        };
    }

    serializeForUpdate() {
        const t = {};
        if (this.title) t.title = this.title;
        if (this.keywordsArray) t.keywordsArray = this.keywordsArray;
        if (this.content) t.content = this.content;
        return t;
    }

    validate_title() {
        if (this.title && this.title.length > 2) return null;
        return 'invalid: min length should be 3';
    }

    validate_content() {
        if (this.content && this.content.length > 5) return null;
        return 'invalid: min length should be 5';
    }

    validate_keywords() {
        if (this.keywordsArray && this.keywordsArray.length > 0) return null;
        return 'invalid: at least one keyword';
    }
}