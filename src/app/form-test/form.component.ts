import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  file!: File;
  formData = new FormData();
  formGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    avatar: new FormControl('', [Validators.required])
  })

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  onSelect(event: Event): void {
    const file = (<HTMLInputElement>event.target).files?.item(0) as File;
    this.file = file;
    this.formGroup.get('avatar')?.setValue(file);
  }

  onSubmit(): void {

    console.log(this.formGroup.value)

    // this.formData.set('username', this.formGroup.value.username);
    // this.formData.set('avatar', this.formGroup.value.avatar, `My-Avatar.${this.file.name.split('.')[1]}`);

    //Send request
    // this.api.send(this.formData).subscribe(response => console.log(response));
  }

}
