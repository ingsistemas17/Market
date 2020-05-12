export interface Factura {
    idCliente:  number;
    valorTotal: number;
    productos:  Producto[];
}

export interface Producto {
    idProducto: number;
    cantidad:   number;
    valorTotal: number;
}
