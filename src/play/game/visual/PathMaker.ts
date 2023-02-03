import { IBlockConfiguration } from '../helpers/IBlockConfiguration';

export abstract class PathMaker {
    protected isEmpty: boolean = false;
    protected isOut: boolean = false;
    protected isIn: boolean = false;

    protected get height() {
        return this.config.blockHeight;
    }

    protected get width() {
        return this.config.blockWidth;
    }

    protected constructor(protected config: IBlockConfiguration) {}
}
