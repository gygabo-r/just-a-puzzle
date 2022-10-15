import {TopPathMaker} from './TopPathMaker';
import {ITopPieceVisual} from './ITopPieceVisual';
import {IBlockConfiguration} from '../helpers/IBlockConfiguration';

describe('TopPathMaker', () => {
  const r = 10;

  const config: IBlockConfiguration = {
    blockWidth: 20,
    blockHeight: 20
  };

  const emptyVisual: ITopPieceVisual = {
    isTopEmpty: () => true,
    isTopIn: () => false,
    isTopOut: () => false,
    isLeftOut: () => true
  };

  const inVisual: ITopPieceVisual = {
    isTopEmpty: () => false,
    isTopIn: () => true,
    isTopOut: () => false,
    isLeftOut: () => false
  };

  const outVisual: ITopPieceVisual = {
    isTopEmpty: () => false,
    isTopIn: () => false,
    isTopOut: () => true,
    isLeftOut: () => true
  };

  it('when left is out moveToStartPoint moves starting point, 1 * height right', () => {
    const pathMaker = new TopPathMaker(emptyVisual, config);
    const line = pathMaker.moveToStartPoint();
    expect(line).toBe(`M ${config.blockHeight} 0 `);
  });

  it('when left is not out moveToStartPoint stays 0', () => {
    const pathMaker = new TopPathMaker(inVisual, config);
    const line = pathMaker.moveToStartPoint();
    expect(line).toBe(`M 0 0 `);
  });

  it('when top is out moveToStartPoint moves starting point, 1 * height down', () => {
    const pathMaker = new TopPathMaker(outVisual, config);
    const line = pathMaker.moveToStartPoint();
    expect(line).toBe(`M ${config.blockHeight} ${config.blockHeight} `);
  });

  it('when top is not out moveToStartPoint stays 0', () => {
    const pathMaker = new TopPathMaker(emptyVisual, config);
    const line = pathMaker.moveToStartPoint();
    expect(line).toBe(`M ${config.blockHeight} 0 `);
  });

  it('when top is empty drawFirstPartOfLine creates a horizontal line, 3 * width right', () => {
    const pathMaker = new TopPathMaker(emptyVisual, config);
    const line = pathMaker.drawFirstPartOfLine();
    expect(line).toBe(`h ${3 * config.blockWidth} `);
  });

  it('when top is not empty drawFirstPartOfLine creates a horizontal line, 1.5 * width - 0.25 * height right', () => {
    const pathMaker = new TopPathMaker(inVisual, config);
    const line = pathMaker.drawFirstPartOfLine();
    expect(line).toBe(`h ${1.5 * config.blockWidth - 0.25 * config.blockHeight} `);
  });

  it('when top is out drawLeftVerticalLine creates a vertical line, 0.25 * height up', () => {
    const pathMaker = new TopPathMaker(outVisual, config);
    const line = pathMaker.drawLeftVerticalLine();
    expect(line).toBe(`v -${0.25 * config.blockHeight} `);
  });

  it('when top is in drawLeftVerticalLine creates a vertical line, 0.25 * height down', () => {
    const pathMaker = new TopPathMaker(inVisual, config);
    const line = pathMaker.drawLeftVerticalLine();
    expect(line).toBe(`v ${0.25 * config.blockHeight} `);
  });

  it('when top is out drawLeftArc creates an arc, with radius 0.5 * height up', () => {
    const pathMaker = new TopPathMaker(outVisual, config);
    const line = pathMaker.drawLeftArc();
    expect(line).toBe(`c ${-r} ${0} ${-r} ${-r} ${0} ${-r} `);
  });

  it('when top is in drawLeftArc creates an arc, with radius 0.5 * height down', () => {
    const pathMaker = new TopPathMaker(inVisual, config);
    const line = pathMaker.drawLeftArc();
    expect(line).toBe(`c ${-r} ${0} ${-r} ${ r} ${0} ${ r} `);
  });

  it('drawHorizontalConnectorLine always creates a horizontal line, 0.5 * height right', () => {
    const pathMaker = new TopPathMaker(inVisual, config);
    const line = pathMaker.drawHorizontalConnectorLine();
    expect(line).toBe(`h ${config.blockHeight / 2} `);
  });

  it('when top is out drawRightArc creates an arc, with radius 0.5 * height down', () => {
    const pathMaker = new TopPathMaker(outVisual, config);
    const line = pathMaker.drawRightArc();
    expect(line).toBe(`c ${ r} ${0} ${ r} ${ r} ${0} ${ r} `);
  });

  it('when top is in drawRightArc creates an arc, with radius 0.5 * height up', () => {
    const pathMaker = new TopPathMaker(inVisual, config);
    const line = pathMaker.drawRightArc();
    expect(line).toBe(`c ${ r} ${0} ${ r} ${-r} ${0} ${-r} `);
  });

  it('when top is out drawLeftVerticalLine creates a vertical line, 0.25 * height down', () => {
    const pathMaker = new TopPathMaker(outVisual, config);
    const line = pathMaker.drawRightVerticalLine();
    expect(line).toBe(`v ${0.25 * config.blockHeight} `);
  });

  it('when top is in drawLeftVerticalLine creates a vertical line, 0.25 * height up', () => {
    const pathMaker = new TopPathMaker(inVisual, config);
    const line = pathMaker.drawRightVerticalLine();
    expect(line).toBe(`v -${0.25 * config.blockHeight} `);
  });

  it('finishLine always draws a horizontal line, 1.5 * width - 0.25 * height right', () => {
    const pathMaker = new TopPathMaker(inVisual, config);
    const line = pathMaker.finishLine();
    expect(line).toBe(`h ${1.5 * config.blockWidth - 0.25 * config.blockHeight} `);
  });

  it('when top is empty draw creates a horizontal line, 3 * width right', () => {
    const pathMaker = new TopPathMaker(emptyVisual, config);
    const line = pathMaker.drawFirstPartOfLine();
    expect(line).toBe(`h ${3 * config.blockWidth} `);
  });

  it('when top is not empty draw creates a path using all the other functions', () => {
    const pathMaker = new TopPathMaker(inVisual, config);
    const line = pathMaker.draw();
    const expected = pathMaker.moveToStartPoint() +
      pathMaker.drawFirstPartOfLine() +
      pathMaker.drawLeftVerticalLine() +
      pathMaker.drawLeftArc() +
      pathMaker.drawHorizontalConnectorLine() +
      pathMaker.drawRightArc() +
      pathMaker.drawRightVerticalLine() +
      pathMaker.finishLine();
    expect(line).toBe(expected);
  });
});
