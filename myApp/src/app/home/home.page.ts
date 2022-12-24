import { Component, ViewEncapsulation } from '@angular/core';
import SwiperCore, {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
} from 'swiper';
import { IonicSlides } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage {
  speed: string | undefined;
  isModalOpen: boolean;
  initialDateTime: string | undefined;
  shutdownTime: string | undefined;
  time: BehaviorSubject<string> = new BehaviorSubject('Set Timer');
  timer: number = 0; // in seconds
  interval: NodeJS.Timeout | undefined;

  constructor() {
    this.isModalOpen = false;
  }

  setFan(speed: string) {
    this.speed = speed;

    if (speed === 'off') {
      this.clearTimer();
    }
  }

  startTimer(dateTime: any) {
    const { hours, minutes } = this.getDateClock(dateTime);
    this.setTimer(hours, minutes);

    this.interval = setInterval(() => {
      this.updateTime();
    }, 1000);

    this.showModal(false);
  }

  clearTimer() {
    clearInterval(this.interval);
    this.time.next('Set Timer');
  }

  updateTime() {
    let hours: number = this.timer / 60 / 60;
    let minutes: number = (this.timer / 60) % 60;
    let seconds: number = this.timer % 60;

    const hoursFormat: string = String('0' + Math.floor(hours)).slice(-2);
    const minutesFormat: string = String('0' + Math.floor(minutes)).slice(-2);
    const secondsFormat: string = String('0' + Math.floor(seconds)).slice(-2);

    const timerFormat = hoursFormat + ':' + minutesFormat + ':' + secondsFormat;
    this.time.next(timerFormat);

    --this.timer;

    if (this.timer < 0) {
      this.clearTimer();
      this.time.complete();
    }
  }

  showModal(isOpen: boolean) {
    const pickerDefaultDate = new Date();
    pickerDefaultDate.setHours(1, 29);
    this.timeChanged(pickerDefaultDate.toISOString());
    this.isModalOpen = isOpen;
  }

  setTimer(hours: number, minutes: number) {
    const hoursInSeconds = hours * 60 * 60;
    const minutesInSeconds = minutes * 60;

    this.timer = hoursInSeconds + minutesInSeconds;
  }

  setShutdownTime(hour: number, minute: number) {
    let midday: string = '';

    if (hour > 11) {
      midday = 'pm';
      hour -= 12;
    } else {
      midday = 'am';
    }

    this.shutdownTime = `${hour}:${minute} ${midday}`;
  }

  getDateClock(dateTime: any): {
    hours: number;
    minutes: number;
  } {
    const date: Date = new Date(dateTime);
    return { hours: date.getHours(), minutes: date.getMinutes() };
  }

  timeChanged(dateTime: any) {
    const { hours, minutes } = this.getDateClock(dateTime);
    const pickerTime = hours * 60 * 60 * 1000 + minutes * 60 * 1000;

    const currentTime: number = new Date().getTime();
    const shutdownDate = new Date(pickerTime + currentTime);

    this.setShutdownTime(shutdownDate.getHours(), shutdownDate.getMinutes());
  }
}
