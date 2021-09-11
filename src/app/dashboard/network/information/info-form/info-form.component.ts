import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NetworkService } from 'src/app/services/network.service';
import { Info } from 'src/app/types/info';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss']
})
export class InfoFormComponent implements OnInit {

  updated = false;
  executed = false;
  timeOut: any;
  message!: string;
  mode!: string;
  qParams = {uId: '', cId: '', cName: ''};
  file!: File | null;
  setAvatar$!: Observable<boolean>;
  infos$!: Observable<Info>;
  formData!: FormData;
  infoForm = new FormGroup({
    user_id: new FormControl(''),
    channel_id: new FormControl(''),
    channel_name: new FormControl(''),
    first_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    link: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(25)]),
    avatar: new FormControl(null, [Validators.required])
  })

  constructor(private route: ActivatedRoute, private network: NetworkService) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      this.qParams.uId = <string>params.get('uId');
      this.qParams.cId = <string>params.get('cId');
      this.qParams.cName = <string>params.get('uName');
      if(params.get('mode') == 'new') {
        this.mode = 'new';
        this.setAvatar$ = of(true);
        this.infoForm.patchValue({
          user_id: params.get('uId'),
          channel_id: params.get('cId'),
          channel_name: params.get('cName')
        })
      } else if(params.get('mode') == 'edit') {
        this.mode = 'edit';
        this.setAvatar$ = of(false);
        this.infoForm.get('avatar')?.setValidators([]);
        const uId = <string>params.get('uId');
        const cId = <string>params.get('cId');
        this.network.getInfo(uId, cId).subscribe(response => {
          const cInfo = response.channelInfo as Info;
          this.infos$ = of(cInfo);
          this.infoForm.patchValue({
            user_id: params.get('uId'),
            channel_id: params.get('cId'),
            channel_name: params.get('cName'),
            first_name: cInfo.first_name,
            last_name: cInfo.last_name,
            link: cInfo.link,
            description: cInfo.description
          })
        })
      }
    });

  }

  onSelectFile(event: Event): void {
    const inputFile = event.target as HTMLInputElement;
    const file = (<FileList>inputFile.files).item(0) as File;
    this.file = file;

    this.infoForm.patchValue({
      avatar: file
    })

  }

  resetFile(event: Event): void {
    if(event) event.preventDefault();
    this.infoForm.get('avatar')?.setValue(null); // Reset in the form Object
    (document.getElementsByName('avatar')[0] as HTMLInputElement).value = ''; //Reset on the template
  }

  deleteAvatar(): void {
    this.setAvatar$ = of(true);
    this.infoForm.get('avatar')?.setValidators([Validators.required]);
    this.infoForm.get('avatar')?.setValue(null);
  }

  onSubmit(): void {

    this.formData = new FormData();
    
    const fileType = <string>this.file?.name.split('.')[1]; //Extension name
    const fileName = `${this.infoForm.value.user_id}-${this.infoForm.value.channel_id}.${fileType}`; //Full name of avatar

    for (const [key, item] of Object.entries(this.infoForm.controls)) {
        this.formData.set(`${key}`, item.value);
        if(key == 'avatar' && item.value != null) {
          this.formData.set('avatar', item.value, fileName);
          this.formData.set('img_extension', fileType);
        }
    }

    if(this.mode == 'new') {
      this.network.addInfos(this.formData).subscribe((response: {executed: boolean, saved: boolean, affectedRows: number}) => {
        this.executed = response.executed;
        this.updated = response.executed;
        this.infoForm.reset();
        this.formData = new FormData();
        this.showMessage(response, 'Information has been created successfully', 'Can\'t create a information !');
      });
    } else if(this.mode == 'edit') {
      this.formData.delete('user_id');
      this.formData.delete('channel_name');
      if(this.infoForm.get('avatar')?.value == null) this.formData.delete('avatar');
      this.network.updateInfos(this.formData).subscribe((response: {executed: boolean, saved: boolean, affectedRows: number}) => {
        if(response.executed) {
          this.executed = response.executed; //to ashow message
          this.updated = response.executed
          this.infoForm.reset();
          this.formData = new FormData();
          this.showMessage(response, 'Information has been updated successfully', 'Can\'t update a information !');
        }
      });
    }

    // this.formData.forEach((v, k) => console.log(k + ' => ' + v))

  }

  onCancel(event: Event): void {
    event.preventDefault();
    history.back();
  }

  private showMessage(response: {executed: boolean, saved?: boolean, affectedRows: number}, successfulMessage: string, failureMessage: string) {
    this.executed = response.executed;
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      if (!this.updated) {
        this.executed = false;
      }
    }, 3000);
    if (response.executed) {
      if (response.affectedRows > 0 || response.saved) {
        this.message = successfulMessage;
      } else if (response.affectedRows == 0 && response?.saved == null) {
        this.message = 'Nothing changed'
      }
    } else {
      this.message = failureMessage;
    }
  }

}
