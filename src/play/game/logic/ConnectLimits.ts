import {GameConfiguration} from '../helpers/GameConfiguration';

export class ConnectLimits {
  public yBigLimitForYChecks: number;
  public ySmallLimitForYChecks: number;

  public xBigLimitForXChecks: number;
  public xSmallLimitForXChecks: number;

  public yLimitForXChecks: number;
  public xLimitForYChecks: number;

  constructor(config: GameConfiguration) {
    this.yBigLimitForYChecks = 1.10 * config.blockHeight * 3;
    this.ySmallLimitForYChecks = 0.90 * config.blockHeight * 3;
    // for x checks the important difference is bigger and y small
    this.xBigLimitForXChecks = 1.10 * config.blockWidth * 3;
    this.xSmallLimitForXChecks = 0.90 * config.blockWidth * 3;

    this.yLimitForXChecks = 0.10 * config.blockHeight * 3;
    this.xLimitForYChecks = 0.10 * config.blockWidth * 3;
  }
}
