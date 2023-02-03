export class TimeService {
    private startTime: number = 0;
    private endTime: number = 0;
    private callBacks: Array<(elapsed: string) => void> = [];
    private intervalId: any;

    public start = () => {
        this.startTime = Date.now();
        this.endTime = 0;
        this.callBacks.forEach((cb) => cb(this.getPrettyElapsed()));
        this.intervalId = setInterval(() => {
            this.callBacks.forEach((cb) => cb(this.getPrettyElapsed()));
        }, 1000);
    };

    public getGameTime = () => this.endTime - this.startTime;

    public getElapsed = () => Date.now() - this.startTime;

    public end = () => {
        this.endTime = Date.now();
        clearInterval(this.intervalId);
    };

    public subscribe = (callback: (elapsed: string) => void) => {
        this.callBacks.push(callback);
    };

    public getStartTime = () => this.startTime;

    public getPrettyElapsed = (): string => {
        const date = this.endTime ? new Date(this.getGameTime()) : new Date(this.getElapsed());
        const seconds = date.getUTCSeconds();
        const secondsString = seconds < 10 ? '0' + seconds : '' + seconds;
        const minutes = date.getUTCMinutes();
        const minutesString = minutes < 10 ? '0' + minutes : '' + minutes;
        const hours = date.getUTCHours();
        const hoursString = hours < 10 ? '0' + hours : '' + hours;
        return `${hoursString}:${minutesString}:${secondsString}`;
    };

    public getEndTime = () => this.endTime;
}
