import {IBlockConfiguration} from '../helpers/IBlockConfiguration';

export abstract class PathMaker {
    protected isEmpty: boolean;
    protected isOut: boolean;
    protected isIn: boolean;

    protected get height() {
        return this.config.blockHeight;
    }

    protected get width() {
        return this.config.blockWidth;
    }

    protected constructor(protected config: IBlockConfiguration) {

    }
}
