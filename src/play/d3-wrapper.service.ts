import * as d3 from 'd3';

export class D3WrapperService {
    public changeBackgroundBrightness(color: string) {
        d3.select('svg').style('background-color', color);
    }
}
