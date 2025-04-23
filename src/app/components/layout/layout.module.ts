import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Exemplos de componentes NÃO standalone */
import { MainComponent } from './main/main.component';

/**
 * LayoutModule é útil se existirem componentes que não estejam
 * marcados como standalone. Caso contrário, pode ser omitido.
 */
@NgModule({
  declarations: [
    MainComponent // Este sim não é standalone, então é declarado aqui
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MainComponent // Disponibiliza para quem importar LayoutModule
  ]
})
export class LayoutModule {}
