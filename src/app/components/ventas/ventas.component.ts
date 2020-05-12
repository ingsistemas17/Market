import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  constructor(private fb: FormBuilder, private ventasServices: VentasService) {

    this.crearFormulario();
   }

  forma: FormGroup;
  agregarVenta = false;
  clienteNoValido = false;
  productoNoValido = false;
  
  //cliente
  nombres = '';
  apellidos = '';

  //producto
  idProducto: number;
  nombre: number;
  stock: number;
  valorUnidad: number;


  //errores
  errorProducto = '';
  errorCliente = '';


  ngOnInit() {
  }

  crearFormulario(){
    this.forma = this.fb.group({
      producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      cliente: ['', [Validators.required]],
      productos: this.fb.array([])
    });
  }

  guardar(){

  }

  getCliente(){
    
    this.ventasServices.getCliente(this.forma.value.cliente).subscribe(
      (resp: any) => {

        console.log(resp);
        this.nombres = resp.nombres;
        this.apellidos = resp.apellidos;

        this.clienteNoValido = false;
        this.errorCliente = '';
        

      }, err => {

        this.clienteNoValido = true;
        this.errorCliente = 'Cliente no Existe';
        console.log(err);
        

      }

    );
  }


  getProducto(){
    let producto = this.fb.array([]);
    console.log(this.forma.value.cantidad);
    if(this.forma.value.cantidad === ''){
                  
      this.errorProducto = 'Agregue una cantidad al producto';
      this.productoNoValido = true;
      return;
    }

    this.ventasServices.getProduct(this.forma.value.producto).subscribe(
      (resp: any) => {

        
        this.idProducto = resp.idProducto;
        this.stock = resp.stock;
        this.valorUnidad = resp.valorUnidad;
        this.nombre = resp.nombre;


        if(this.forma.value.cantidad > this.stock){
                  
          this.errorProducto = 'No hay suficientes unidades disponibles';
          this.productoNoValido = true;
          return;
        }

          this.errorProducto = '';
          this.productoNoValido = false;

          

          producto.push(this.fb.control(this.forma.value.producto, Validators.required));
          producto.push(this.fb.control(this.nombre, Validators.required));
          producto.push(this.fb.control(this.forma.value.cantidad, Validators.required));
          producto.push(this.fb.control(this.valorUnidad, Validators.required));
          producto.push(this.fb.control(this.forma.value.cantidad * this.valorUnidad , Validators.required));
        
          this.productos.push( producto);

          console.log(this.productos);
          
        

      }, err => {

        this.productoNoValido = true;
        this.errorProducto = 'Producto no existe';
        console.log(err);
        

      }

    );
  }

  get productos(){
    return this.forma.get('productos') as FormArray;
  }

  borrarProducto( i: number){
    this.productos.removeAt(i);
  }


}
