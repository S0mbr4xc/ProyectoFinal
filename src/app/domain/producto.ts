export class Producto {
    codigo ?: number
    nombre ?: string
    precio ?:number
    stock?: number
    codeBarras?:string
    url ?: string
    categoria?:Categoria
    carrito ?: Carrito

}

export class Categoria{}

export class Carrito{}