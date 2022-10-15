import {LeftPathMaker} from './LeftPathMaker';
import {ILeftPieceVisual} from './ILeftPieceVisual';
import {IBlockConfiguration} from '../helpers/IBlockConfiguration';

describe('LeftPathMaker', () => {
  const r = 10;

  const config: IBlockConfiguration = {
    blockWidth: 20,
    blockHeight: 20
  };

  const emptyVisual: ILeftPieceVisual = {
    isLeftEmpty: () => true,
    isLeftIn: () => false,
    isLeftOut: () => false,
  };

  const inVisual: ILeftPieceVisual = {
    isLeftEmpty: () => false,
    isLeftIn: () => true,
    isLeftOut: () => false,
  };

  const outVisual: ILeftPieceVisual = {
    isLeftEmpty: () => false,
    isLeftIn: () => false,
    isLeftOut: () => true,
  };

  it('when left is empty drawFirstPartOfLine creates a vertical line, 3 * height up', () => {
    const pathMaker = new LeftPathMaker(emptyVisual, config);
    const line = pathMaker.drawFirstPartOfLine();
    expect(line).toBe(`v -${3 * config.blockHeight} `);
  });

  it('when left is not empty drawFirstPartOfLine creates a vertical line, height * 5 / 4 up', () => {
    const pathMaker = new LeftPathMaker(inVisual, config);
    const line = pathMaker.drawFirstPartOfLine();
    expect(line).toBe(`v -${config.blockHeight * 5 / 4} `);
  });

  it('when left is in drawBottomHorizontalLine creates a horizontal line, 0.25 * height right', () => {
    const pathMaker = new LeftPathMaker(inVisual, config);
    const line = pathMaker.drawBottomHorizontalLine();
    expect(line).toBe(`h ${0.25 * config.blockHeight} `);
  });

  it('when left is out drawBottomHorizontalLine creates a horizontal line, 0.25 * height left', () => {
    const pathMaker = new LeftPathMaker(outVisual, config);
    const line = pathMaker.drawBottomHorizontalLine();
    expect(line).toBe(`h -${0.25 * config.blockHeight} `);
  });

  it('when left is out drawLowArc creates an arc, with radius 0.5 * height left', () => {
    const pathMaker = new LeftPathMaker(outVisual, config);
    const line = pathMaker.drawLowArc();
    expect(line).toBe(`c ${0} ${r} ${-r} ${r} ${-r} ${0} `);
  });

  it('when left is in drawLowArc creates an arc, with radius 0.5 * height right', () => {
    const pathMaker = new LeftPathMaker(inVisual, config);
    const line = pathMaker.drawLowArc();
    expect(line).toBe(`c ${0} ${r} ${ r} ${r} ${ r} ${0} `);
  });

  it('drawVerticalConnectorLine always creates a vertical line, 0.5 * height up', () => {
    const pathMaker = new LeftPathMaker(inVisual, config);
    const line = pathMaker.drawVerticalConnectorLine();
    expect(line).toBe(`v ${-config.blockHeight / 2} `);
  });

  it('when left is out drawTopArc creates an arc, with radius 0.5 * height right', () => {
    const pathMaker = new LeftPathMaker(outVisual, config);
    const line = pathMaker.drawTopArc();
    expect(line).toBe(`c ${0} ${-r} ${ r} ${-r} ${ r} ${0} `);
  });

  it('when left is in drawTopArc creates an arc, with radius 0.5 * height left', () => {
    const pathMaker = new LeftPathMaker(inVisual, config);
    const line = pathMaker.drawTopArc();
    expect(line).toBe(`c ${0} ${-r} ${-r} ${-r} ${-r} ${0} `);
  });

  it('when left is out drawTopHorizontalLine creates a horizontal line, 0.25 * height right', () => {
    const pathMaker = new LeftPathMaker(outVisual, config);
    const line = pathMaker.drawTopHorizontalLine();
    expect(line).toBe(`h ${0.25 * config.blockHeight} `);
  });

  it('when left is in drawTopHorizontalLine creates a horizontal line, 0.25 * height left', () => {
    const pathMaker = new LeftPathMaker(inVisual, config);
    const line = pathMaker.drawTopHorizontalLine();
    expect(line).toBe(`h -${0.25 * config.blockHeight} `);
  });

  it('finishLine always draws a vertical line, height * 5 / 4 up', () => {
    const pathMaker = new LeftPathMaker(inVisual, config);
    const line = pathMaker.finishLine();
    expect(line).toBe(`v -${config.blockHeight * 5 / 4} `);
  });

  it('when left is empty draw creates a vertical line, 3 * height up', () => {
    const pathMaker = new LeftPathMaker(emptyVisual, config);
    const line = pathMaker.draw();
    expect(line).toBe(`v -${3 * config.blockHeight} `);
  });

  it('when left is not empty draw creates a path using all the other functions', () => {
    const pathMaker = new LeftPathMaker(inVisual, config);
    const line = pathMaker.draw();
    const expected = pathMaker.drawFirstPartOfLine() +
      pathMaker.drawBottomHorizontalLine() +
      pathMaker.drawLowArc() +
      pathMaker.drawVerticalConnectorLine() +
      pathMaker.drawTopArc() +
      pathMaker.drawTopHorizontalLine() +
      pathMaker.finishLine();
    expect(line).toBe(expected);
  });
});
