import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import {PieceVisual} from './game/visual/PieceVisual';

@Injectable({
  providedIn: 'root'
})
export class HintService {
  private pieces: PieceVisual[];
  private svgTargetId = 'play-area';
  public numberOfHintsLeft = 3;

  constructor() { }

  public setPieces(pieces: PieceVisual[]) {
    this.pieces = pieces;
    this.numberOfHintsLeft = 3;
  }

  public showHint(): void {
    this.numberOfHintsLeft--;
    const pieces = this.findMatchingPieces();

    if (pieces && pieces.length > 0)
        this.displayHints(pieces);
  }

  public pullSmallSetsUp() {
    const visualSets = this.pieces.reduce((sum, current) => {
      const currArr = sum.find(c => c[0].logic.set === current.logic.set);
      if (currArr) {
        currArr.push(current);
      } else {
        sum.push([current]);
      }
      return sum;
    }, []);

    visualSets.sort((a, b) => a.length > b.length ? -1 : 1);

    for (const set of visualSets) {
      set.forEach((v) => {
        const el = d3.select(`#imi${v.logic.row}j${v.logic.column}`);
        el.raise();
      });
    }
  }

  private findMatchingPieces(): PieceVisual[] {
    const cutX = this.pieces[0].config.cutX;
    const matchingPieces = [];
    for (let i = 0; (i < this.pieces.length) && (matchingPieces.length < 2); i++) {
      const currentPiece = this.pieces[i];
      const pieceOnTop = this.pieces[i - cutX];
      const pieceOnBottom = this.pieces[i + cutX];
      const pieceOnLeft = this.pieces[i - 1];
      const pieceOnRight = this.pieces[i + 1];

      if (pieceOnTop && pieceOnTop.logic.set !== currentPiece.logic.set) {
        matchingPieces.splice(0, 0, currentPiece, pieceOnTop);
        break;
      }

      if (pieceOnBottom && pieceOnBottom.logic.set !== currentPiece.logic.set) {
        matchingPieces.splice(0, 0, currentPiece, pieceOnBottom);
        break;
      }

      if (pieceOnLeft && pieceOnLeft.logic.set !== currentPiece.logic.set) {
        matchingPieces.splice(0, 0, currentPiece, pieceOnLeft);
        break;
      }

      if (pieceOnRight && pieceOnRight.logic.set !== currentPiece.logic.set) {
        matchingPieces.splice(0, 0, currentPiece, pieceOnRight);
        break;
      }
    }

    return matchingPieces;
  }

  private displayHints(pieces: PieceVisual[]) {
    pieces.forEach((v) => {
      const el = d3.select(`#imi${v.logic.row}j${v.logic.column}`);
      el.raise();
    });

    const svg = d3.select(`#${this.svgTargetId}`).select('svg');
    svg.selectAll('circle').remove();
    svg.selectAll('circle')
      .data(pieces)
      .enter()
      .append('circle')
      .attr('cx', d => d.logic.getCenterX())
      .attr('cy', d => d.logic.getCenterY())
      .attr('r', d => d.getHintR())
      .attr('stroke', 'black')
      .attr('stroke-width', 3)
      .attr('fill', 'white').on('mousedown', () => svg.selectAll('circle').remove());
  }
}
