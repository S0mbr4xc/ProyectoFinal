import { Component, OnInit } from '@angular/core';
import { Cabecera } from 'src/app/domain/cabecera';
import { Detalle } from 'src/app/domain/detalle';
import { Persona } from 'src/app/domain/persona';
import { AuthService } from 'src/app/services/auth-service';
import { CarritoServices } from 'src/app/services/carrito-services';
import { FacturaServices } from 'src/app/services/factura-services';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-mostrar-fac',
  templateUrl: './mostrar-fac.component.html',
  styleUrls: ['./mostrar-fac.component.scss']
})
export class MostrarFacComponent implements OnInit{

  detalles : any
  det : Detalle = new Detalle()
  constructor(private facturaServices: FacturaServices, private authService : AuthService, private carritoService : CarritoServices) {}

  ngOnInit(): void {
    this.detalles = this.facturaServices.getDetallesList(CarritoServices.codigoCabecera)
  }

  imprimir() {
    // Extraemos el
    const DATA = document.getElementById('frm');
    if (!DATA) {
        console.error('No se encontró el elemento con ID "frm"');
        return;
    }

    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
        background: 'white',
        scale: 9
    };

    html2canvas(DATA, options).then((canvas) => {
        const img = canvas.toDataURL('image/PNG');
        // Add image Canvas to PDF
        const bufferX = 10;
        const bufferY = 250;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        return doc;
    }).then((docResult) => {
        docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
}

}
