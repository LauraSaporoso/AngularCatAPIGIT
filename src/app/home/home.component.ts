import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { FormControl, Validators } from '@angular/forms';
import { Cat } from '../models/cat.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ownerName!: string;
  catName!: string;

  // per razza
  breedChoosed: any;
  breedList!: any[];

  constructor(public varService: ServiceService) {}

  // prendo dati breeds da service facendo subscribe e mettendo dati in breedList
  ngOnInit() {
    this.varService.getBreedDetails().subscribe(
      (data) => {
        this.breedList = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // passa dati service
  getDatas() {
    this.varService.updateCat(this.ownerName, this.catName, this.breedChoosed);
  }
}
