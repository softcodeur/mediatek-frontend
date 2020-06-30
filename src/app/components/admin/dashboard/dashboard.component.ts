import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
 

import {Chart} from 'node_modules/chart.js';
import {DOCUMENT} from "@angular/common";
import {Product} from '../../../model/product';
import {element} from "protractor";
function generateRandomColor()
{
  var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  return randomColor;
  //random color will be freshly served
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userCount:any = "";
  productCount:any = "";
  transactionCount:any = "";

  libelleProduit:string[]=[];
  demande:string[]=[];
  products:Product[];
  data:number[]=[];
  spinner:boolean=true;
  colors:string[]=[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.numberOfUsers();
    this.numberOfProducts();
    this.numberOfTransactions();
    var yLabels = { 25: 'faible', 50:'moyenne', 75: 'forte'};

     
    this.adminService.findAllProducts().subscribe(data => {
      this.products = <Product[]> data;
      this.products.forEach(element =>{
        this.libelleProduit.push(element.libelle);
         this.colors.push(generateRandomColor());
              });
  

  this.products.forEach(element =>{
      this.adminService.findAllDemande(element.num_prod).subscribe(data => {
         console.log(data.response);
        this.demande.push(data.response) ;
          if(data.response == 'faible'){
            this.data.push(25);
            //this.colors.push('#fd7e14');
          }else if(data.response == 'moyenne'){
            this.data.push(50);
            this.colors.push('#e83e8c');
          }else{
            this.data.push(75);
            //this.colors.push('#6610f2');
          }
            });
    });


    

      setTimeout(()=>{
        let myChart = new Chart("myChart", {
          type: 'bar',
          data: {
            labels: this.libelleProduit,
            datasets: [{
              data: this.data,
              backgroundColor: this.colors,
              borderColor:this.colors
              ,
              borderWidth: 1
            }]
          },
          options: {
            title: {
              display: true,
              text: 'Statistique sur la demande...',
              fontSize:25,
              fontColor:'#07031a'
            },
            legend: {
              display: false
            },
            scales: {
             /* xAxes:[{
                scaleLabel: {
                  display: true,
                  labelString: 'Produits',
                  fontSize: 25
                }
              }],*/
              yAxes: [{
                id: 'first-y-axis',
                type: 'linear',
                scaleLabel: {
                  display: true,
                  labelString: 'DEMANDE',
                  fontSize: 25
                },
                ticks: {
                  display:true,
                  callback: function(value, index, values) {
                    return yLabels[value];
                  }
                }
              }]
            }
          }
        });
      }, 2000);

         });
  }

  numberOfUsers(){
    this.adminService.numberOfUsers().subscribe(data => {
      this.userCount = data.response;
    });
  }

  numberOfProducts(){
    this.adminService.numberOfProducts().subscribe(data => {
      this.productCount = data.response;
    });
  }

  numberOfTransactions(){
    this.adminService.numberOfTransactions().subscribe(data => {
      this.transactionCount = data.response;
    })
  }




}
