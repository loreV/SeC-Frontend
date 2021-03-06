import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { components } from 'src/binding/Binding';
import { RestResponse } from './RestResponse';


export type Place = components["schemas"]["PlaceDto"]
export type PlaceResponse = components["schemas"]["PlaceResponse"]
export type LinkedMedia = components["schemas"]["LinkedMediaDto"]
export type UnlinkMedia = components["schemas"]["UnLinkeMediaRequestDto"]

@Injectable({
  providedIn: 'root'
})

// TODO: add skip and limit usage
export class MaintenanceService {

  baseUrl = "api/place";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  get(skip: number, limit: number): Observable<PlaceResponse> {
    return this.httpClient.get<PlaceResponse>(this.baseUrl)
      .pipe(
        tap(_ => console.log("")),
        catchError(this.handleError<PlaceResponse>('', null))
      );
  }

  getById(id: string): Observable<PlaceResponse> {
    return this.httpClient.get<PlaceResponse>(this.baseUrl + "/" + id)
      .pipe(
        tap(_ => console.log("")),
        catchError(this.handleError<PlaceResponse>('', null))
      );
  }

  getLikeNameOrTags(name: string) {
    return this.httpClient.get<PlaceResponse>(this.baseUrl + "/name/" + name)
      .pipe(
        tap(_ => console.log("")),
        catchError(this.handleError<PlaceResponse>('', null))
      );
  }

  create(place: Place): Observable<PlaceResponse> {
    return this.httpClient.put<PlaceResponse>(this.baseUrl, place)
      .pipe(
        tap(_ => console.log("")),
        catchError(this.handleError<PlaceResponse>('Save maintenance', null))
      );
  }

  update(place: Place): Observable<PlaceResponse> {
    return this.httpClient.post<RestResponse>(this.baseUrl, place)
      .pipe(
        tap(_ => console.log("")),
        catchError(this.handleError<RestResponse>('Save maintenance', null))
      );
  }

  addMedia(placeId: String, linkedMedia: LinkedMedia): Observable<PlaceResponse> {
    return this.httpClient.put<PlaceResponse>(this.baseUrl + "/" + placeId, linkedMedia)
      .pipe(
        tap(_ => console.log("")),
        catchError(this.handleError<PlaceResponse>('Save maintenance', null))
      );
  }

  removeMedia(placeId: String, linkedMedia: UnlinkMedia): Observable<PlaceResponse> {
    return this.httpClient.post<PlaceResponse>(this.baseUrl + "/" + placeId, linkedMedia)
      .pipe(
        tap(_ => console.log("")),
        catchError(this.handleError<PlaceResponse>('', null))
      );
  }

  deleteById(_id: any): Observable<PlaceResponse> {
    return this.httpClient.delete<PlaceResponse>(this.baseUrl + "/" + _id)
      .pipe(
        tap(_ => console.log("")),
        catchError(this.handleError<PlaceResponse>('', null))
      );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
