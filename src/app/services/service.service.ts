import { Injectable } from '@angular/core';
import { Cat } from '../models/cat.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  // Oggetto di tipo Cat accessibile da ogni componente a patto che utilizzino il service
  public catCard$: BehaviorSubject<Cat> = new BehaviorSubject<Cat>({} as Cat);
  constructor(private http: HttpClient) {}

  //Aggiorno la carta coi dati dell'input
  // dal breed detail andrò a prendere solo i dati che mi interessano

  updateCat(owName: string, cName: string, breedDetail: any) {
    console.log(breedDetail);
    const catCard: Cat = {
      ownerName: owName,
      catName: cName,
      breed: breedDetail.name,
      imgId: breedDetail.reference_image_id,
      description: breedDetail.description,
      intelligence: breedDetail.intelligence,
      affection_level: breedDetail.affection_level,
      origin: breedDetail.origin,
      stranger_friendly: breedDetail.stranger_friendly,
      dog_friendly: breedDetail.dog_friendly,
    };

    this.catCard$.next(catCard);
    console.log(this.catCard$.value.imgId);
  }

  //get della lista di breeds con tutte le sue proprietà

  getBreedCategories(): Observable<any> {
    const urlBreedCategories = `https://api.thecatapi.com/v1/breeds`;
    return this.http.get<any[]>(urlBreedCategories);
  }

  //get dell'image tramite catCard.imgID
  getImage(): Observable<any> {
    const imageUrl = `https://api.thecatapi.com/v1/images/${this.catCard$.value.imgId}`;
    return this.http.get<any>(imageUrl);
  }
}
