import {PieceVisual} from './PieceVisual';
import {GameConfiguration} from '../helpers/GameConfiguration';
import {ConnectLimits} from '../logic/ConnectLimits';

describe('PieceVisual', () => {
  const config = new GameConfiguration();
  config.cutX = 10;
  config.cutY = 10;
  config.blockWidth = 10;
  config.blockHeight = 10;

  const limits = new ConnectLimits(config);

  it('when the sum of coordinates is even, left and right are out, top and bottom are in', () => {
    const row = 1;
    const column = 1;
    const visual = new PieceVisual(row, column, config, limits);

    expect(visual.isLeftOut()).toBe(true);
    expect(visual.isRightOut()).toBe(true);
    expect(visual.isBottomIn()).toBe(true);
    expect(visual.isTopIn()).toBe(true);
  });

  it('when the sum of coordinates is odd, left and right are in, top and bottom are out', () => {
    const row = 1;
    const column = 2;
    const visual = new PieceVisual(row, column, config, limits);

    expect(visual.isLeftIn()).toBe(true);
    expect(visual.isRightIn()).toBe(true);
    expect(visual.isBottomOut()).toBe(true);
    expect(visual.isTopOut()).toBe(true);
  });

  it('when the piece is on the top row then top is empty', () => {
    const row = 0;
    const column = 2;
    const visual = new PieceVisual(row, column, config, limits);

    expect(visual.isTopEmpty()).toBe(true);
  });

  it('when the piece is on the bottom row then bottom is empty', () => {
    const row = config.cutY - 1;
    const column = 2;
    const visual = new PieceVisual(row, column, config, limits);

    expect(visual.isBottomEmpty()).toBe(true);
  });

  it('when the piece is on the left then left is empty', () => {
    const row = 9;
    const column = 0;
    const visual = new PieceVisual(row, column, config, limits);

    expect(visual.isLeftEmpty()).toBe(true);
  });

  it('when the piece is on the right then right is empty', () => {
    const row = 9;
    const column = config.cutX - 1;
    const visual = new PieceVisual(row, column, config, limits);

    expect(visual.isRightEmpty()).toBe(true);
  });

  it('when left is out, the we will get a padding of blockheight for the left', () => {
    const row = 1;
    const column = 1;
    const visual = new PieceVisual(row, column, config, limits);

    expect(visual.paddingLeft).toBe(config.blockHeight);
  });

  it('when top is out, the we will get a padding of blockheight for the top', () => {
    const row = 1;
    const column = 2;
    const visual = new PieceVisual(row, column, config, limits);

    expect(visual.paddingTop).toBe(config.blockHeight);
  });

  it('when only left is out, width is 3 * blockwidth + 1 * blockheight', () => {
    const row = 7;
    const column = config.cutX - 1;
    const visual = new PieceVisual(row, column, config, limits);

    expect(visual.getWidth()).toBe(3 * config.blockWidth + config.blockHeight);
  });

  it('when only right is out, width is 3 * blockwidth + 1 * blockheight', () => {
    const row = 0;
    const column = 0;
    const visual = new PieceVisual(row, column, config, limits);

    expect(visual.getWidth()).toBe(3 * config.blockWidth + config.blockHeight);
  });

  it('when right and left is out, width is 3 * blockwidth + 2 * blockheight', () => {
    const row = 2;
    const column = 2;
    const visual = new PieceVisual(row, column, config, limits);

    expect(visual.getWidth()).toBe(3 * config.blockWidth + 2 * config.blockHeight);
  });

  it('when right and left is in, width is 3 * blockwidth', () => {
    const row = 2;
    const column = 1;
    const visual = new PieceVisual(row, column, config, limits);

    expect(visual.getWidth()).toBe(3 * config.blockWidth);
  });

  it('when only top is out, height is 4 * blockheight', () => {
    const row = config.cutY - 1;
    const column = 8;
    const visual = new PieceVisual(row, column, config, limits);

    expect(visual.getHeight()).toBe(4 * config.blockHeight);
  });

  it('when only bottom is out, height is 4 * blockheight', () => {
    const row = 0;
    const column = 7;
    const visual = new PieceVisual(row, column, config, limits);

    expect(visual.getHeight()).toBe(4 * config.blockHeight);
  });

  it('when top and bottom is out, height is 5 * blockheight', () => {
    const row = 3;
    const column = 2;
    const visual = new PieceVisual(row, column, config, limits);

    expect(visual.getHeight()).toBe(5 * config.blockHeight);
  });

  it('when top and bottom is in, height is 3 * blockheight', () => {
    const row = 2;
    const column = 2;
    const visual = new PieceVisual(row, column, config, limits);

    expect(visual.getHeight()).toBe(3 * config.blockHeight);
  });

  it('when top is out, starting point is moved by 1 * blockheight vertical', () => {
    const row = 3;
    const column = 2;
    const visual = new PieceVisual(row, column, config, limits);
    const startPoint = visual.getStartingPointDifference();
    expect(startPoint.y).toBe(config.blockHeight);
  });

  it('when left is out, starting point is moved by 1 * blockheight horizontal', () => {
    const row = 2;
    const column = 2;
    const visual = new PieceVisual(row, column, config, limits);
    const startPoint = visual.getStartingPointDifference();
    expect(startPoint.x).toBe(config.blockHeight);
  });
});
