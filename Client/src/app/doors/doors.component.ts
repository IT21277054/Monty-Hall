import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface GameApiResponse {
  goat: number;
  car: number;
  pick: number;
}

@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.css'],
})
export class DoorsComponent {
  value: string = 'a';
  goat: number = 0;
  car: number = 0;
  pick: number = 0;
  imageUrl: string =
    'https://media0.giphy.com/media/S8BSJcEg6aztJjhWU1/giphy.gif?cid=6c09b952uzqp00bpwg8tri9o60tkakoepe023k7b8iuzll8b&ep=v1_stickers_related&rid=giphy.gif&ct=s';
  modalTitle: string = 'hey';
  discription: string = 'Do you want to switch?';
  hideButtons: boolean = false;

  showModal = false;
  constructor(private http: HttpClient) {}

  chooseDoor(choice: number) {
    const apiUrl = `https://localhost:9897/api/game/pick/${choice}`;

    this.http.get<GameApiResponse>(apiUrl).subscribe(
      (response) => {
        this.goat = response.goat;
        this.car = response.car;
        this.pick = choice;

        if (this.goat === 0) {
          this.value = 'A';
        } else if (this.goat === 1) {
          this.value = 'B';
        } else if (this.goat === 2) {
          this.value = 'C';
        }

        this.modalTitle = `Door ${this.value} has a Goat behind it`;
        this.showModal = true;
      },
      (error) => {
        console.error('API call error:', error);
      }
    );
  }

  choice(choice: string) {
    const apiUrl = `https://localhost:9897/api/game/choice/${choice}/${this.car}/${this.pick}`;
    this.showModal = true;

    this.http.get(apiUrl).subscribe(
      (response) => {
        this.hideButtons = true;
        this.modalTitle = 'You win a ...';

        if (response == 1) {
          this.imageUrl =
            'https://cutewallpaper.org/24/driving-a-car-animated-gif/freedom-driving-motion-design-animation-car-animation-funny-gif.gif';
          this.discription = 'Congrats!!!';
        } else this.discription = 'Better luck next time';
      },
      (error) => {
        console.error('API call error:', error);
      }
    );
  }

  openModal(letter: string): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.discription = 'Do you want to switch?';
    this.hideButtons = false;
    this.imageUrl =
      'https://media0.giphy.com/media/S8BSJcEg6aztJjhWU1/giphy.gif?cid=6c09b952uzqp00bpwg8tri9o60tkakoepe023k7b8iuzll8b&ep=v1_stickers_related&rid=giphy.gif&ct=s';
    this.showModal = false;
  }
}
