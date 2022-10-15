import {IBlockConfiguration} from './IBlockConfiguration';

export class GameConfiguration implements IBlockConfiguration {
    public cutY: number;
    public cutX: number;

    public viewWidth: number;
    public viewHeight: number;
    public playImageHeight: number;

    public blockHeight: number;
    public blockWidth: number;
}
