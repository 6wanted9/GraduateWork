export class Storage {
    static get(key: string) {
        const value = window.localStorage.getItem(key);
        if (value && value !== 'undefined') {
            return JSON.parse(value);
        }

        return null;
    }

    static set(key: string, data: string) {
        window.localStorage.setItem(key, JSON.stringify(data));
    }

    static remove(key: string) {
        window.localStorage.removeItem(key);
    }
}