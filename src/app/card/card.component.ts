import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnDestroy {
  urlImg!: string;

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private varService: ServiceService, private location: Location) {}

  ngOnInit(): void {
    //estraggo l'url dell'immagine tramite chiamata http del service
    this.varService
      .getImage()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap({
          next: (data) => {
            this.urlImg = data.url;
          },
          error: (error) => {
            console.log(error);
          },
        })
      )
      .subscribe();
  }

  get getCatCard() {
    return this.varService.catCard$.value;
  }
  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
