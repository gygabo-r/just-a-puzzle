import {RightPathMaker} from './RightPathMaker';
import {IRightPieceVisual} from './IRightPieceVisual';
import {IBlockConfiguration} from '../helpers/IBlockConfiguration';

describe('RightPathMaker', () => {
  const r = 10;

  const config: IBlockConfiguration = {
    blockWidth: 20,
    blockHeight: 20
  };

  const emptyVisual: IRightPieceVisual = {
    isRightEmpty: () => true,
    isRightIn: () => false,
    isRightOut: () => false,
  };

  const inVisual: IRightPieceVisual = {
    isRightEmpty: () => false,
    isRightIn: () => true,
    isRightOut: () => false,
  };

  const outVisual: IRightPieceVisual = {
    isRightEmpty: () => false,
    isRightIn: () => false,
    isRightOut: () => true,
  };

  it('when right is empty drawFirstPartOfLine creates a vertical line, 3 * height down', () => {
    const pathMaker = new RightPathMaker(emptyVisual, config);
    const line = pathMaker.drawFirstPartOfLine();
    expect(line).toBe(`v ${3 * config.blockHeight} `);
  });

  it('when right is not empty drawFirstPartOfLine creates a vertical line, height * 5 / 4 down', () => {
    const pathMaker = new RightPathMaker(inVisual, config);
    const line = pathMaker.drawFirstPartOfLine();
    expect(line).toBe(`v ${config.blockHeight * 5 / 4} `);
  });

  it('when right is in drawTopHorizontalLine creates a horizontal line, 0.25 * height left', () => {
    const pathMaker = new RightPathMaker(inVisual, config);
    const line = pathMaker.drawTopHorizontalLine();
    expect(line).toBe(`h -${0.25 * config.blockHeight} `);
  });

  it('when right is out drawTopHorizontalLine creates a horizontal line, 0.25 * height right', () => {
    const pathMaker = new RightPathMaker(outVisual, config);
    const line = pathMaker.drawTopHorizontalLine();
    expect(line).toBe(`h ${0.25 * config.blockHeight} `);
  });

  it('when right is out drawTopArc creates an arc, with radius 0.5 * height right', () => {
    const pathMaker = new RightPathMaker(outVisual, config);
    const line = pathMaker.drawTopArc();
    expect(line).toBe(`c ${0} ${-r} ${ r} ${-r} ${ r} ${0} `);
  });

  it('when right is in drawTopArc creates an arc, with radius 0.5 * height left', () => {
    const pathMaker = new RightPathMaker(inVisual, config);
    const line = pathMaker.drawTopArc();
    expect(line).toBe(`c ${0} ${-r} ${-r} ${-r} ${-r} ${0} `);
  });

  it('drawVerticalConnectorLine always creates a vertical line, 0.5 * height down', () => {
    const pathMaker = new RightPathMaker(inVisual, config);
    const line = pathMaker.drawVerticalConnectorLine();
    expect(line).toBe(`v ${config.blockHeight / 2} `);
  });

  it('when right is out drawLowArc creates an arc, with radius 0.5 * height left', () => {
    const pathMaker = new RightPathMaker(outVisual, config);
    const line = pathMaker.drawLowArc();
    expect(line).toBe(`c ${0} ${r} ${-r} ${r} ${-r} ${0} `);
  });

  it('when right is in drawLowArc creates an arc, with radius 0.5 * height right', () => {
    const pathMaker = new RightPathMaker(inVisual, config);
    const line = pathMaker.drawLowArc();
    expect(line).toBe(`c ${0} ${r} ${ r} ${r} ${ r} ${0} `);
  });

  it('when right is out drawLowHorizontalLine creates a horizontal line, 0.25 * height left', () => {
    const pathMaker = new RightPathMaker(outVisual, config);
    const line = pathMaker.drawLowHorizontalLine();
    expect(line).toBe(`h -${0.25 * config.blockHeight} `);
  });

  it('when left is in drawLowHorizontalLine creates a horizontal line, 0.25 * height right', () => {
    const pathMaker = new RightPathMaker(inVisual, config);
    const line = pathMaker.drawLowHorizontalLine();
    expect(line).toBe(`h ${0.25 * config.blockHeight} `);
  });

  it('finishLine always draws a vertical line, height * 5 / 4 down', () => {
    const pathMaker = new RightPathMaker(inVisual, config);
    const line = pathMaker.finishLine();
    expect(line).toBe(`v ${config.blockHeight * 5 / 4} `);
  });

  it('when left is empty draw creates a vertical line, 3 * height down', () => {
    const pathMaker = new RightPathMaker(emptyVisual, config);
    const line = pathMaker.draw();
    expect(line).toBe(`v ${3 * config.blockHeight} `);
  });

  it('when left is not empty draw creates a path using all the other functions', () => {
    const pathMaker = new RightPathMaker(inVisual, config);
    const line = pathMaker.draw();
    const expected = pathMaker.drawFirstPartOfLine() +
      pathMaker.drawTopHorizontalLine() +
      pathMaker.drawTopArc() +
      pathMaker.drawVerticalConnectorLine() +
      pathMaker.drawLowArc() +
      pathMaker.drawLowHorizontalLine() +
      pathMaker.finishLine();
    expect(line).toBe(expected);
  });
});
