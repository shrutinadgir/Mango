export class StorageDriver {
    public static set(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    public static get(key: string): string {
        return localStorage.getItem(key);
    }
    public static remove(key: string): any {
        return localStorage.removeItem(key);
    }
    public static clear(): any {
        return localStorage.clear();
    }
}