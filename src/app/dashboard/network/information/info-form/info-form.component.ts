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

  loading = false;
  updated = false;
  executed = false;
  timeOut: any;
  message!: string;
  mode!: string;
  qParams = {uHs: '', cHs: '', cName: ''};
  file!: File | null;
  setAvatar$!: Observable<boolean>;
  infos$!: Observable<Info>;
  formData!: FormData;
  infoForm = new FormGroup({
    user_hash: new FormControl(''),
    channel_hash: new FormControl(''),
    // channel_name: new FormControl(''),
    first_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    website: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(25)]),
    avatar: new FormControl(null, [Validators.required])
  })

  constructor(private route: ActivatedRoute, private network: NetworkService) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      this.qParams.uHs = <string>params.get('uHs');
      this.qParams.cHs = <string>params.get('cHs');
      this.qParams.cName = <string>params.get('cName');
      this.qParams.cHs = <string>params.get('cHs');
      if(params.get('mode') == 'new') {
        this.mode = 'new';
        this.setAvatar$ = of(true);
        this.infoForm.patchValue({
          user_hash: params.get('uHs'),
          channel_hash: params.get('cHs'),
          // channel_name: params.get('cName')
        })
      } else if(params.get('mode') == 'edit') {
        this.mode = 'edit';
        this.setAvatar$ = of(false);
        this.infoForm.get('avatar')?.setValidators([]);
        const uId = <string>params.get('uHs');
        const cId = <string>params.get('cHs');
        const cHs = <string>params.get('cHs');
        this.network.getInfo(cHs).subscribe(response => {
          const cInfo = response as Info;
          this.infos$ = of(cInfo);
          this.infoForm.patchValue({
            user_hash: params.get('uHs'),
            channel_hash: params.get('cHs'),
            // channel_name: params.get('cName'),
            first_name: cInfo.first_name,
            last_name: cInfo.last_name,
            website: cInfo.link,
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

    this.loading = true;

    const fileType = <string>this.file?.name.split('.')[1]; //Extension name
    const fileName = `${this.infoForm.value.user_hash}.${fileType}`; //Full name of avatar

    for (const [key, item] of Object.entries(this.infoForm.controls)) {
        this.formData.set(`${key}`, item.value);
        if(key == 'avatar' && item.value != null) {
          this.formData.set('avatar', item.value, fileName);
          // this.formData.set('img_extension', fileType);
        }
    }

    // this.formData.forEach((v, k) => console.log(k + ' => ' + v));
    // return;

    if(this.mode == 'new') {
      this.network.addInfos(this.formData).subscribe((response: {executed: boolean, saved: boolean, affectedRows: number}) => {
        this.executed = response.executed;
        this.updated = response.executed;
        this.infoForm.reset();
        this.formData = new FormData();
        this.loading = false;
        this.showMessage(response, 'Information has been created successfully', 'Can\'t create a information !');
      });
    } else if(this.mode == 'edit') {
      // this.formData.delete('user_hash');
      // this.formData.delete('channel_name');
      if(this.infoForm.get('avatar')?.value == null) this.formData.delete('avatar');
      this.network.updateInfos(this.formData).subscribe((response: {executed: boolean, saved: boolean, affectedRows: number}) => {
        if(response.executed) {
          this.executed = response.executed; //to ashow message
          this.updated = response.executed
          this.infoForm.reset();
          this.formData = new FormData();
          this.loading = false;
          this.showMessage(response, 'Information has been updated successfully', 'Can\'t update a information !');
        }
      });
    }

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
