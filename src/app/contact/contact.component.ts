import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
  	'firstname':'',
  	'lastname':'',
  	'tellnum':'',
  	'email':''
  };

  validationMessages = {
  	'firstname':{
  		'required':'First name is required.',
  		'minlength':'First name must be at least 2 characters long.',
  		'maxlength':'First name cannot be more than 25 characters long. '
  	},
  	'lastname':{
  		'required':'Last name is required.',
  		'minlength':'Last name must be at least 2 characters long.',
  		'maxlength':'Last name cannot be more than 25 characters long. '
  	},
  	'tellnum':{
  		'required':'Telephone number is required.',
  		'pattern':'Telephone number must contain only numbers.'
  	},
  	'email':{
  		'required':'Email is required.',
  		'email':'Email not in valid format'
  	}
  };
  
  constructor(private fb: FormBuilder) {
  	this.createForm();
   }

  ngOnInit(): void {
  }

  createForm(){
  	this.feedbackForm = this.fb.group({
  		firstname:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
  		lastname:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
  		tellnum:[0, [Validators.required, Validators.pattern]],
  		email:['', [Validators.required, Validators.email]],
  		agree:false,
  		contacttype:'None',
  		message:''
  	});

  	this.feedbackForm.valueChanges
  		.subscribe(data => this.onValueChanged(data));

  	this.onValueChanged();//re(set) form validation messages
  }

  onSubmit(){
  	this.feedback = this.feedbackForm.value;
  	console.log(this.feedback);
  	this.feedbackForm.reset({
       firstname:'',
       lastname:'',
       tellnum:0,
       email:'',
       agree:false,
       contacttype:'None',
       message:''
    });
    this.feedbackFormDirective.resetForm();
  }

  onValueChanged(data?:any){
  	if(!this.feedbackForm){return;}
  	const form = this.feedbackForm;
  	for(const field in this.formErrors){
  		if(this.formErrors.hasOwnProperty(field)){
  			//clear previous error messages
  			this.formErrors[field] = '';
  			const control = form.get(field);
  			if(control && control.dirty && !control.valid){
  				const messages = this.validationMessages[field];
  				for(const key in control.errors){
  					if(control.errors.hasOwnProperty(key)){
  						this.formErrors[field] += messages[key]+'';
  					}
  				}
  			}
  		}
  	}
  }

}
