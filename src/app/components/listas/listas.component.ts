import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada: boolean;

  @ViewChild( IonList ) lista: IonList;

  constructor(public deseosService: DeseosService,
              private route: Router,
              public alertCtrl: AlertController) { 
  
  }

  ngOnInit() {}
  
  

  listaSeleccionada( lista: Lista ) {

    if (this.terminada) {
      this.route.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.route.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }

 
  }


  borrarLista( lista: any ) {
  
    this.deseosService.borrarLista(lista);
  }






  async modificarNombreLista( lista: Lista ) {
    const alert = await this.alertCtrl.create({
      header: 'Modificar nombre de la lista',
      inputs: [
        {
      name: 'titulo',
      type: 'text',
      value: lista.titulo
      }
    ],
      buttons: [
        {
text: 'Cancelar',
role: 'cancel',
handler: () => {
  this.lista.closeSlidingItems();
  console.log('Cancelar');
}
      },
      {
        text: 'Guardar cambios',
      handler: (data) => {
        console.log(data);
        if (data.titulo === lista.titulo) {
          return;
      } if (data.titulo.length === 0) {
          return;
        } else {
          lista.titulo = data.titulo;
          this.deseosService.guardarStorage();
          this.lista.closeSlidingItems();
        }
        

        // lisrado de deseos
      }



      }
    ]
    });

    alert.present();
  }



}
