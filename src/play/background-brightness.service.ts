import { D3WrapperService } from './d3-wrapper.service';

export class BackgroundBrightnessService {
    private step = 25;
    private _brightness: number;

    public get brightness() {
        return this._brightness;
    }

    public set brightness(value) {
        this._brightness = value;
        this.d3Wrapper.changeBackgroundBrightness(this.backgroundColor);
    }

    constructor(private d3Wrapper: D3WrapperService) {
        const brightness = this.loadBrightness();
        this._brightness = brightness > -1 && brightness < 251 ? brightness : 125;
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
            this.saveBrightness(this.brightness);
        }
    }

    public decrease(): void {
        if (!this.cantDecrease) {
            this.brightness -= this.step;
            this.saveBrightness(this.brightness);
        }
    }

    private saveBrightness(value: number): void {
        window.localStorage.setItem('just-a-puzzle-brightness', value.toString(10));
    }

    private loadBrightness(): number {
        const value = window.localStorage.getItem('just-a-puzzle-brightness');
        if (value !== null && value !== undefined && value !== '') return Number(value);
        else return -1;
    }
}
