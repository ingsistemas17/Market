import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private url = environment.endpoint;

  constructor(private http: HttpClient) { }



getProduct(code: string){
  return this.http.get(`${this.url}/api/Venta/GetProduct/${code}`)
  .pipe( map( resp => {
    console.log(resp);
        return resp;
  }));

 
}

getCliente(identificacion: number){
  return this.http.get(`${this.url}/api/Venta/GetCliente/${identificacion}`)
  .pipe( map( resp => {
    console.log(resp);
        return resp;
  }));

 
}



}