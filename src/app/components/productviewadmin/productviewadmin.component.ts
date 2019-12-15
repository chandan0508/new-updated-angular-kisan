import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import {ActivatedRoute} from '@angular/router';
import {FormGroup,FormControl } from '@angular/forms'
import { productviewadmin } from './productviewadmin';
@Component({
  selector: 'app-productviewadmin',
  templateUrl: './productviewadmin.component.html',
  styleUrls: ['./productviewadmin.component.css']
})
export class ProductviewadminComponent implements OnInit {

  products:any = [];
  viewForm :FormGroup;
  viewProuct :productviewadmin
  constructor(private  _adminService:AdminService, private activeRoute:ActivatedRoute) { }

  ngOnInit() {

    this._adminService.getAllProducts().then(response=>{
      this.products = response;
      console.log(response);
    }).catch(error=>{
      console.log("error");
    })

    this.viewForm=new FormGroup({
      ID:new FormControl(),
      Name :new FormControl(),
      Information :new FormControl(),
      Price :new FormControl()
    })
  }
  

  Deleteproduct(id){
    this._adminService.Deleteproduct(id).then(response=>{
      for(let i=0;i<this.products.length;i++)
      {
        if(this.products[i].id==id)
        {
          this.products.splice(i,1);
        }
      }
    })
  }
  update()
  {
    this.viewProuct={
      id:this.viewForm.value.ID,
      name:this.viewForm.value.Name,
      information:this.viewForm.value.Information,
      price:this.viewForm.value.Price
    }
    console.log(this.viewForm)
    this._adminService.updateProduct(this.viewProuct);
    console.log(this.viewForm)

  }

}
