import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService) { }

  DepartmentList:any=[];

  ActivateAddEditDepComp:boolean=false
  ModalTitle:string=""
  dep:any

  DepartmentIdFilter:string=""
  DepartmentNameFilter:string=""
  DepartmentListWithoutFilter:any=[]

  ngOnInit(): void {
    this.refreshDepList()
  }

  addClick(){
    this.dep = {
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModalTitle = "Add Department"
    this.ActivateAddEditDepComp = true
  }

  closeClick(){
    this.ActivateAddEditDepComp = false
    this.refreshDepList()
  }

  editClick(item:any){
    this.dep = item
    this.ModalTitle="Edit Department"
    this.ActivateAddEditDepComp=true
  }

  deleteClick(item:any){
    if(confirm('Are you sure?')){
      this.service.deleteDep(item.DepartmentId).subscribe(data=>{
        alert(data.toString())
        this.refreshDepList()
      })

    }
  }

  refreshDepList(){
    this.service.getDepList().subscribe(data =>{
      this.DepartmentList = data
      this.DepartmentListWithoutFilter = data
    })
  }

  FilterFn(){
    var DepartmentIdFilter = this.DepartmentIdFilter
    var DepartmentNameFilter = this.DepartmentNameFilter

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function(el:any){
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      )&&
      el.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      )
    })
  }

  sortResult(key:string, asc:boolean){
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a:any,b:any){
      if (asc){
        return (a[key]>b[key])? 1 : ((a[key]<b[key])?-1 :0)
      }
      else{
        return (b[key]>a[key])? 1 : ((b[key]<a[key])?-1 :0)
      }

    })
    
  }
}
