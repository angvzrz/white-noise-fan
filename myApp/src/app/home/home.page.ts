import { Component, ViewEncapsulation } from '@angular/core';
import SwiperCore, {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
} from 'swiper';
import { IonicSlides } from '@ionic/angular';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage {
  speed: string | undefined;
  isModalOpen: boolean = false;
  shutdownTime: string = '';

  constructor() {}

  setFan(speed: string) {
    this.speed = speed;
  }

  showModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  timeChanged(dateTime: any) {
    const pickerDate = new Date(dateTime);
    const pickerTime =
      pickerDate.getHours() * 60 * 60 * 1000 +
      pickerDate.getMinutes() * 60 * 1000;
    const currentTime: number = new Date().getTime();
    const shutdownDate = new Date(pickerTime + currentTime);
    let midday: string = '';
    let shutdownHour = shutdownDate.getHours();

    if (shutdownDate.getHours() > 11) {
      midday = 'pm';
      shutdownHour -= 12;
    } else {
      midday = 'am';
    }

    this.shutdownTime = `${shutdownHour}:${shutdownDate.getMinutes()} ${midday}`;
  }

  setTimer() {
    this.showModal(false);
  }
}
