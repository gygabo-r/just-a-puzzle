import { LocalStorageService } from './local-storage.service';
import { D3WrapperService } from './d3-wrapper.service';

export class BackgroundBrightnessService {
    private step = 25;
    // @ts-ignore
    private _brightness: number;

    public get brightness() {
        return this._brightness;
    }

    public set brightness(value) {
        this._brightness = value;
        this.d3Wrapper.changeBackgroundBrightness(this.backgroundColor);
    }

    constructor(private localStorage: LocalStorageService, private d3Wrapper: D3WrapperService) {
        const brightness = this.localStorage.getBrightness();
        this.brightness = brightness > -1 && brightness < 251 ? brightness : 125;
    }

    public get cantIncrease() {
        return this.brightness > 249;
    }
    public get cantDecrease() {
        return this.brightness < 1;
    }
    public get backgroundColor() {
        return `rgb(${this.brightness}, ${this.brightness}, ${this.brightness})`;
    }

    public increase(): void {
        if (!this.cantIncrease) {
            this.brightness += this.step;
            this.localStorage.setBrightness(this.brightness);
        }
    }

    public decrease(): void {
        if (!this.cantDecrease) {
            this.brightness -= this.step;
            this.localStorage.setBrightness(this.brightness);
        }
    }
}
