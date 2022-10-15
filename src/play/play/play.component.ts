import { Component, OnInit} from '@angular/core';
import {Cut} from '../../browse/messages/Cut';
import {ActivatedRoute, Params} from '@angular/router';
import {PictureService} from '../../browse/picture.service';
import {categoryPictureError} from '../../browse/messages/CategoryPictureError';
import {Location} from '@angular/common';
import {GameStartService} from '../game-start.service';

const componentClass = 'container-fluid flex-column';
const componentStyle = 'width: 100%';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  host: { 'class' : componentClass, 'style' :  componentStyle }
})
export class PlayComponent implements OnInit {

  private imageId: number;
  private cut: Cut;
  public categoryName: string;
  public categoryId: number;
  public pictureName: string;

  // todo: too many params, think about it later
  constructor(
    private activatedRoute: ActivatedRoute,
    private pictureService: PictureService,
    private location: Location,
    private gameStartService: GameStartService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((value: Params) => {
      this.imageId = value['pictureId'];
      this.cut = new Cut();
      const cutValues = value['cutSize'].split('x');
      this.cut.x = Number(cutValues[0]);
      this.cut.y = Number(cutValues[1]);
      this.pictureService.getOnlyHideOnError(this.imageId).subscribe(data => {

        if (data === categoryPictureError) {
          this.location.back();
          return;
        }

        this.categoryName = data.categoryName;
        this.categoryId = data.categoryId;
        this.pictureName = data.name;

        this.gameStartService.start(this.cut, data);

      });
    });
  }
}
