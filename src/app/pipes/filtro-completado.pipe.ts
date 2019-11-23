import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from 'src/app/models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  pure: false
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], conmpletada: boolean = true): Lista[] {

  return listas.filter(lista =>  lista.terminada === conmpletada);


    
  }

}
