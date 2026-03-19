import { TestBed, ComponentFixture } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { SimonComponent } from './simon.component';
import { SimonService } from './services/simon.service';
import { TilesEnum } from '../public-api';
import { By } from '@angular/platform-browser';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';

describe('SimonComponent', () => {
  let fixture: ComponentFixture<SimonComponent>;
  let component: SimonComponent;
  let service: SimonService;
  let playMock: any;

  beforeEach(() => {
    playMock = vi.fn();
    class AudioMock {
      currentTime = 0;
      play = playMock;
    }
    vi.stubGlobal('Audio', AudioMock);

    TestBed.configureTestingModule({
      imports: [SimonComponent, MatButton, MatCheckbox],
      providers: [SimonService],
    });

    fixture = TestBed.createComponent(SimonComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SimonService);

    fixture.componentRef.setInput('translations', { title: 'Test Simon' });
    fixture.componentRef.setInput('successSoundPath', 'success.mp3');
    fixture.componentRef.setInput('errorSoundPath', 'error.mp3');
    fixture.componentRef.setInput(
      'tilesSoundPath',
      new Map([[TilesEnum.GREEN, 'green.mp3']]),
    );
    fixture.detectChanges();
  });

  it('should create component and initialize assets', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(service.tiles()).toHaveLength(4);
    expect(service.soundEnabled()).toBe(true);
  });

  it('should start game when Start button is clicked', () => {
    const startButton = fixture.debugElement.queryAll(By.css('button'))[0];
    startButton.triggerEventHandler('click', null);
    expect(service.isGameStarted()).toBe(true);
  });

  it('should pause and resume game', () => {
    service.startGame();
    fixture.detectChanges();

    service.pauseGame();
    fixture.detectChanges();

    const pauseResumeButton = fixture.debugElement.query(By.css('button'));
    pauseResumeButton.triggerEventHandler('click', null);

    expect(service.isGamePaused()).toBe(false);
  });

  it('should toggle sound when checkbox changed', () => {
    service.startGame();
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('mat-checkbox'));
    checkbox.triggerEventHandler('change', { checked: false });

    expect(service.soundEnabled()).toBe(false);
  });

  it('should display level and timer', () => {
    service.startGame();
    fixture.detectChanges();

    const levelSpan = fixture.debugElement.query(
      By.css('.gameInfo span'),
    ).nativeElement;
    expect(levelSpan.textContent).toContain('Level');

    const timerSpan = fixture.debugElement.queryAll(By.css('.gameInfo span'))[1]
      .nativeElement;
    expect(timerSpan.textContent).toMatch(/\d{2}:\d{2}/);
  });

  it('should show game over message', () => {
    service['_gameOver'].set(true);
    fixture.detectChanges();

    const gameOverSpan = fixture.debugElement.query(By.css('.gameOver'));
    expect(gameOverSpan).toBeTruthy();
    expect(gameOverSpan.nativeElement.textContent).toBe(
      service.defaultTranslations.gameOver,
    );
  });

  it('should click a tile', () => {
    service['_isGameStarted'].set(true);
    service['_isGamePaused'].set(false);
    service['_gameOver'].set(false);
    service['isPlayingSequence'].set(false);
    service['isGoingToNextRound'].set(false);

    fixture.detectChanges();

    const tileButton = fixture.debugElement.query(By.css('.board button'));
    tileButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const tile = service.tiles()[0];
    expect(tile.active).toBe(true);
  });

  it('should call pauseGame on destroy', () => {
    const pauseSpy = vi.spyOn(service, 'pauseGame');
    component.ngOnDestroy();

    expect(pauseSpy).toHaveBeenCalled();
  });
});
