import { Injectable } from '@angular/core';
import { Cut } from '../browse/messages/Cut';
import { CategoryPicture } from '../browse/messages/CategoryPicture';
import { MakePuzzle } from './game/MakePuzzle';
import { TitleService } from '../services/title.service';
import { GameHistoryService } from './game-history.service';
import { GamePictureUrlService } from './game-picture-url.service';
import { FinishedModalService } from './finished-modal.service';
import { HintService } from './hint.service';
import { BackgroundBrightnessService } from './background-brightness.service';

@Injectable({
    providedIn: 'root',
})
export class GameStartService {
    private lastCut: Cut;
    private lastImageId: number;
    private lastPictureData: CategoryPicture;
    private puzzle: MakePuzzle;

    constructor(
        private titleService: TitleService,
        private gameHistoryService: GameHistoryService,
        private gamePictureUrl: GamePictureUrlService,
        private finishedService: FinishedModalService,
        private hintService: HintService,
        private brightnessService: BackgroundBrightnessService
    ) {}

    public start(cut: Cut, pictureData: CategoryPicture): void {
        this.lastCut = cut;
        this.lastImageId = pictureData.id;
        this.lastPictureData = pictureData;

        this.gameHistoryService.finishedCallBack = (message: string) => {
            this.finishedService.open(message, () => this.restart());
        };
        this.titleService.setPlayTitle(this.lastPictureData.name);
        const url = `api/gamecontent/${this.lastPictureData.fileName}`;
        this.gamePictureUrl.set(url);
        this.puzzle = new MakePuzzle(
            url,
            this.lastCut.x,
            this.lastCut.y,
            this.gameHistoryService,
            this.lastImageId,
            this.hintService,
            this.brightnessService
        );
    }

    public restart(): void {
        this.titleService.setPlayTitle(this.lastPictureData.name);
        const url = `api/gamecontent/${this.lastPictureData.fileName}`;
        this.gamePictureUrl.set(url);
        this.puzzle = new MakePuzzle(
            url,
            this.lastCut.x,
            this.lastCut.y,
            this.gameHistoryService,
            this.lastImageId,
            this.hintService,
            this.brightnessService
        );
    }
}
