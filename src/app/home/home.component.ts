import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { FormControl, Validators } from '@angular/forms';
import { Cat } from '../models/cat.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  ownerName!: string;
  catName!: string;

  // per razza
  breedChoosed: any;
  breedList!: any[];

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public varService: ServiceService) {}

  // prendo dati breeds da service facendo subscribe e mettendo dati in breedList
  ngOnInit() {
    this.varService
      .getBreedCategories()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap({
          next: (data) => {
            this.breedList = data;
          },
          error: (error) => {
            console.error(error);
          },
        })
      )
      .subscribe();
  }

  // passa dati service
  getDatas() {
    this.varService.updateCat(this.ownerName, this.catName, this.breedChoosed);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
