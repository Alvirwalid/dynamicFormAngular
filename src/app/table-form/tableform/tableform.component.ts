import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-tableform',
  templateUrl: './tableform.component.html',
  styleUrl: './tableform.component.css'
})
export class TableformComponent {

  public  employeeForm:any=FormGroup;

  isCheckAll:boolean=false;

  constructor(
    private fb:FormBuilder
  ) {

    this.employeeForm=this.fb.group({
      tableRows:this.fb.array([],[Validators.required])
    })

    this.addRow();
  }


  createFormGroup():FormGroup{
    return this.fb.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      city:[''],
      state:[''],
      isChecked:[false],
    })
  }
 get getFormControl(){
    const  control=this.employeeForm.get('tableRows') as FormArray;
    return control;
  }

  addRow(){
    const  control=this.employeeForm.get('tableRows') as FormArray;
    control.push(this.createFormGroup())
  }

  checkAll(checkval:boolean){

    this.getFormControl.controls.forEach(formGroup=>{
      formGroup.get('isChecked')?.setValue(checkval);
    })
  }

  onStatusChange(event:any,index:number){
    const control= this.employeeForm.get('tableRows') as FormArray;

    if(event.target.value=='deactive'){
      control.controls[index].get('state')?.disable()
      control.controls[index].get('city')?.disable()
    }else {
      control.controls[index].get('state')?.enable()
      control.controls[index].get('city')?.enable()
    }
  }

  removeEmployee(index:number){
    const control= this.employeeForm.get('tableRows') as FormArray;

    control.removeAt(index);

  }

  onSave(){
    const  formValue= this.employeeForm.value;

    console.log(formValue);
  }


}
