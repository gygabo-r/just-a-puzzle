export class LocalStorageService {
    private storage: Storage;

    constructor() {
        this.storage = window.localStorage;
    }

    public setBrightness(value: number): void {
        this.storage.setItem('just-a-puzzle-brightness', value.toString(10));
    }

    public getBrightness(): number {
        const value = this.storage.getItem('just-a-puzzle-brightness');
        if (value !== null && value !== undefined && value !== '') return Number(value);
        else return -1;
    }
}
