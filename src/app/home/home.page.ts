import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Produto } from '../Model/produto';
import { ProdServiceService } from '../Services/prod-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  produtos: any[] = [];

  constructor(public ac : AlertController, private prodApi: ProdServiceService) {
    this.CarregarApi();
  }

  async MostrarAdd(){
    const alert = await this.ac.create({
      cssClass: 'my-custom-class',
      header: 'Insira o nome do produto',
      inputs: [
        {
          name: "Tarefa",
          type: 'text',
          placeholder: 'Nome do produto'
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          handler: () => {
            console.log("Cancelar Funfando");
          }
        },
        {
          text: "Adicionar",
          handler: (form) => {
            this.Add(form.Tarefa);
            console.log("Adicionar Funfando");
            console.log();
          }
        }
      ]
    });
    await alert.present();
  }

  async Add(prodNome: string){
    let prod = new Produto;
    prod.nome = prodNome;
    prod.active = false;

    this.prodApi.post(prod);
    window.location.reload();
  }

  Remover(task: any){
    this.prodApi.delete(task.id);
    this.produtos = this.produtos.filter((prodArray) => prodArray != task);
  }

  Checar(task){
    if(!task.marcado)
    task.marcado = true;
    else
    task.marcado = false;

    this.prodApi.put(task.id, task)
  }

  CarregarApi(){
    this.prodApi.getAll()
    .then((json) => {
      this.produtos = <Produto[]>json;
    })
    .catch((erro) => {
      console.log("API INDISPONIVEL!"+erro);
    })
  }
}
