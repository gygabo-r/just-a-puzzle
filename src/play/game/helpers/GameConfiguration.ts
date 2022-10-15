import { IBlockConfiguration } from './IBlockConfiguration';

export class GameConfiguration implements IBlockConfiguration {
    public cutY: number = 0;
    public cutX: number = 0;

    public viewWidth: number = 0;
    public viewHeight: number = 0;
    public playImageHeight: number = 0;

    public blockHeight: number = 0;
    public blockWidth: number = 0;
}
