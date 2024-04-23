import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  userForm:any=FormGroup;

  constructor(private router:Router) {
    this.createForm();
  }
  createForm(){
    this.userForm=new FormGroup({
      name:new FormControl("",[Validators.required]),
      email:new FormControl("",[Validators.required]),
      city:new FormControl("",[Validators.required]),
      address:new FormControl("",[Validators.required]),
      contact:new FormArray([
        new FormControl({
          type:new FormControl(''),
          contact:new FormControl(''),
        })
      ]),
    })
  }

  addContact(){
    const  control=<FormArray> this.userForm.controls['contact'];

    control.push(
    new FormGroup({
      type:new FormControl(''),
      contact:new FormControl('')
    })
  )
  }

  removeContact(index:any){
    const  control=<FormArray> this.userForm.controls['contact'];
     control.removeAt(index);
  }

  save(){
    const emp=this.userForm.value;
    console.log(emp);
  }
}
