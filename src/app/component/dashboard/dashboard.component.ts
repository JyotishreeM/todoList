import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  taskObj: Task = new Task();
  taskArray : Task[] = [];
  addTaskValue : string = '';
  editTaskValue : string = '';
  
  constructor(private crudService:CrudService){}
  ngOnInit(){
    this.editTaskValue= '';
    this.addTaskValue= '';
    this.taskObj = new Task();
    this.taskArray = [];
    this.getAllTasks();
  }
  addTask(){
    this.taskObj.task_name = this.addTaskValue;
   
    this.crudService.addTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
      this.addTaskValue = '';
    }, err=>{
      alert("No item is listed")
    } )
  }

  getAllTasks(){
    this.crudService.getAllTasks().subscribe(res=>{
      this.taskArray =  res;
    }, err=>{
      alert(err)
    })
  }

  editTask(){
    this.taskObj.task_name = this.editTaskValue;
  
    this.crudService.EditTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("falied to Update")
    })
  }

  deleteTask(etask: Task){
    this.crudService.deleteTask(etask).subscribe(res=>{
      this.ngOnInit();
    }, err=>{
      alert("failed to delete")
    })
  }

  call(etask : Task){
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }

}
