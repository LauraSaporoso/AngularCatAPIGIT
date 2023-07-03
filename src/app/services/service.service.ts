import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cat } from '../models/cat.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  public catCard!: Cat;
  constructor(private http: HttpClient) {}

  // per passare valori
  updateCat(owName: string, cName: string, breedDetail: any) {
    this.catCard = {
      ownerName: owName,
      catName: cName,
      breed: breedDetail.name,
      origin: breedDetail.origin,
      description: breedDetail.description,
      imgId: breedDetail.reference_image_id,
      intelligence: breedDetail.intelligence,
      affection_level: breedDetail.affection_level,
      stranger_friendly: breedDetail.stranger_friendly,
      dog_friendly: breedDetail.dog_friendly,
    };

    console.log(this.catCard);
  }

  // API breeds
  getBreedDetails() {
    const urlBreedDetails = `http://api.thecatapi.com/v1/breeds`;
    return this.http.get<any[]>(urlBreedDetails);
  }

  // API Img con imgId
  getImage() {
    const urlImage = `https://api.thecatapi.com/v1/images/${this.catCard.imgId}`;
    return this.http.get<any>(urlImage);
  }
}
