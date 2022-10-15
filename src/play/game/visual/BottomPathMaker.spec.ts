import {BottomPathMaker} from './BottomPathMaker';
import {IBottomPieceVisual} from './IBottomPieceVisual';
import {IBlockConfiguration} from '../helpers/IBlockConfiguration';

describe('BottomPathMaker', () => {
  const r = 10;

  const config: IBlockConfiguration = {
    blockWidth: 20,
    blockHeight: 20
  };

  const emptyVisual: IBottomPieceVisual = {
    isBottomEmpty: () => true,
    isBottomIn: () => false,
    isBottomOut: () => false,
  };

  const inVisual: IBottomPieceVisual = {
    isBottomEmpty: () => false,
    isBottomIn: () => true,
    isBottomOut: () => false,
  };

  const outVisual: IBottomPieceVisual = {
    isBottomEmpty: () => false,
    isBottomIn: () => false,
    isBottomOut: () => true,
  };

  it('when bottom is empty drawFirstPartOfLine creates a horizontal line, 3 * width left', () => {
    const pathMaker = new BottomPathMaker(emptyVisual, config);
    const line = pathMaker.drawFirstPartOfLine();
    expect(line).toBe(`h -${3 * config.blockWidth} `);
  });

  it('when bottom is not empty drawFirstPartOfLine creates a horizontal line, 1.5 * width - 0.25 * height right', () => {
    const pathMaker = new BottomPathMaker(inVisual, config);
    const line = pathMaker.drawFirstPartOfLine();
    expect(line).toBe(`h -${1.5 * config.blockWidth - 0.25 * config.blockHeight} `);
  });

  it('when bottom is out drawRightVerticalLine creates a vertical line, 0.25 * height down', () => {
    const pathMaker = new BottomPathMaker(outVisual, config);
    const line = pathMaker.drawRightVerticalLine();
    expect(line).toBe(`v ${0.25 * config.blockHeight} `);
  });

  it('when bottom is in drawRightVerticalLine creates a vertical line, 0.25 * height up', () => {
    const pathMaker = new BottomPathMaker(inVisual, config);
    const line = pathMaker.drawRightVerticalLine();
    expect(line).toBe(`v -${0.25 * config.blockHeight} `);
  });

  it('when bottom is out drawRightArc creates an arc, with radius 0.5 * height down', () => {
    const pathMaker = new BottomPathMaker(outVisual, config);
    const line = pathMaker.drawRightArc();
    expect(line).toBe(`c ${r} ${0} ${r} ${ r} ${0} ${ r} `);
  });

  it('when bottom is in drawRightArc creates an arc, with radius 0.5 * height up', () => {
    const pathMaker = new BottomPathMaker(inVisual, config);
    const line = pathMaker.drawRightArc();
    expect(line).toBe(`c ${r} ${0} ${r} ${-r} ${0} ${-r} `);
  });

  it('drawHorizontalConnectorLine always creates a horizontal line, 0.5 * height left', () => {
    const pathMaker = new BottomPathMaker(inVisual, config);
    const line = pathMaker.drawHorizontalConnectorLine();
    expect(line).toBe(`h ${-config.blockHeight / 2} `);
  });

  it('when bottom is out drawLeftArc creates an arc, with radius 0.5 * height up', () => {
    const pathMaker = new BottomPathMaker(outVisual, config);
    const line = pathMaker.drawLeftArc();
    expect(line).toBe(`c ${-r} ${0} ${-r} ${-r} ${0} ${-r} `);
  });

  it('when bottom is in drawLeftArc creates an arc, with radius 0.5 * height down', () => {
    const pathMaker = new BottomPathMaker(inVisual, config);
    const line = pathMaker.drawLeftArc();
    expect(line).toBe(`c ${-r} ${0} ${-r} ${ r} ${0} ${ r} `);
  });

  it('when bottom is out drawLeftVerticalLine creates a vertical line, 0.25 * height up', () => {
    const pathMaker = new BottomPathMaker(outVisual, config);
    const line = pathMaker.drawLeftVerticalLine();
    expect(line).toBe(`v -${0.25 * config.blockHeight} `);
  });

  it('when bottom is in drawLeftVerticalLine creates a vertical line, 0.25 * height down', () => {
    const pathMaker = new BottomPathMaker(inVisual, config);
    const line = pathMaker.drawLeftVerticalLine();
    expect(line).toBe(`v ${0.25 * config.blockHeight} `);
  });

  it('finishLine always draws a horizontal line, 1.5 * width - 0.25 * height left', () => {
    const pathMaker = new BottomPathMaker(inVisual, config);
    const line = pathMaker.finishLine();
    expect(line).toBe(`h -${1.5 * config.blockWidth - 0.25 * config.blockHeight} `);
  });

  it('when bottom is empty draw creates a horizontal line, 3 * width left', () => {
    const pathMaker = new BottomPathMaker(emptyVisual, config);
    const line = pathMaker.drawFirstPartOfLine();
    expect(line).toBe(`h -${3 * config.blockWidth} `);
  });

  it('when bottom is not empty draw creates a path using all the other functions', () => {
    const pathMaker = new BottomPathMaker(inVisual, config);
    const line = pathMaker.draw();
    const expected = pathMaker.drawFirstPartOfLine() +
      pathMaker.drawRightVerticalLine() +
      pathMaker.drawRightArc() +
      pathMaker.drawHorizontalConnectorLine() +
      pathMaker.drawLeftArc() +
      pathMaker.drawLeftVerticalLine() +
      pathMaker.finishLine();
    expect(line).toBe(expected);
  });
});
