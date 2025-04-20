export class ReportDataModel {
    public vendas: number;
    public atividadesPopulares: string[];
    public usuariosAtivos: number;
  
    constructor(vendas: number, atividadesPopulares: string[], usuariosAtivos: number) {
      this.vendas = vendas;
      this.atividadesPopulares = atividadesPopulares;
      this.usuariosAtivos = usuariosAtivos;
    }
  }
  