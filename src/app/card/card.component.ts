import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  urlImg!: string;
  constructor(private varService: ServiceService, private location: Location) {}

  ngOnInit(): void {
    this.varService.getImage().subscribe(
      (data) => {
        this.urlImg = data.url;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get getCatCard() {
    return this.varService.catCard;
  }
  goBack() {
    this.location.back();
  }
}
