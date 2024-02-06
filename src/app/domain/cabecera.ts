export class Cabecera {
    codigo ?: number
    fecha?:Date
    iva?:number
    persona?:Persona
    subtotal?:number
    total?:number
    detalle?: Detalle[]
}

export class Persona{}
export class Detalle{}