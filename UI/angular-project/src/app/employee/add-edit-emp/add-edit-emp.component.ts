import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() emp:any
  EmployeeId:string=""
  EmployeeName:string=""
  Department:string=""
  DateOfJoining:string=""
  PhotoFileName:string=""
  PhotoFilePath:string=""

  DepartmentsList:any = []

  ngOnInit(): void {
    this.loadDepartmentList()
  }

  loadDepartmentList(){
    this.service.getAllDepNames().subscribe(data=>{
      this.DepartmentsList=data
      
      this.EmployeeId=this.emp.EmployeeId
      this.EmployeeName = this.emp.EmployeeName
      this.Department = this.emp.Department
      this.DateOfJoining = this.emp.DateOfJoining
      this.PhotoFileName = this.emp.PhotoFileName
      this.PhotoFilePath = this.service.PhotoUrl+this.PhotoFileName
    })
  }

  addEmployee(){
    var val = {EmployeeId:this.EmployeeId, EmployeeName: this.EmployeeName, Department:this.Department, DateOfJoining: this.DateOfJoining, PhotoFileName: this.PhotoFileName}

    this.service.addEmp(val).subscribe(res=>{
      alert(res.toString());
    })
  }
  updateEmployee(){
    var val = {EmployeeId:this.EmployeeId, EmployeeName: this.EmployeeName, Department:this.Department, DateOfJoining: this.DateOfJoining, PhotoFileName: this.PhotoFileName}

    this.service.updateEmp(val).subscribe(res=>{
      alert(res.toString());
    })
    
  }

  uploadPhoto(event:any){
    var file = event.target.files[0]
    const formData:FormData = new FormData

    formData.append('uploadedFiles', file, file.name)

    console.log(formData)

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName = data.toString()
      this.PhotoFilePath = this.service.PhotoUrl+this.PhotoFileName
    })
  }

}
