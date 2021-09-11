import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { NetworkService } from 'src/app/services/network.service';
import { StoreService } from 'src/app/services/store.service';
import { Channel } from 'src/app/types/channel';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  channelSubscription!: Subscription;
  channel!: Channel;
  //-----------------------------
  mode!: string;
  submitted!: boolean;
  executed: boolean | undefined;
  updated!: boolean;
  timeOut: any;
  message!: string;
  //------------------------------
  formData = new FormData();
  channelForm = new FormGroup({
    hash: new FormControl('', [Validators.required]),
    ord: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
    channel: new FormControl('', [Validators.required, Validators.minLength(3)]),
    stream: new FormControl('', [Validators.required]),
    logo: new FormControl('', [Validators.required]),
    guide: new FormControl('', [Validators.required])
  });

  constructor(private network: NetworkService, private store: StoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.channelSubscription = this.route.queryParamMap.pipe(
      mergeMap(params => {
        this.mode = <string>params.get('mode');
        return params.get('mode') == 'new'
          ? this.network.generateHashWithMaxOrder().pipe(
            map(response => {
              this.channelForm.reset();
              this.executed = undefined;
              this.channelForm.patchValue({
                hash: response.hash,
                ord: response.maxOrder + 1,
              });
            }))
          : this.store.store.pipe(
            tap(storedValue => {
              const channel = storedValue.channel as Channel;
              this.channel = channel;
              // console.log(channel);
              this.channelForm.patchValue({
                hash: channel?.hash,
                ord: channel?.ord,
                channel: channel?.channel,
                stream: channel?.stream,
                guide: typeof channel?.guide == 'string' ? channel?.guide : ''
              })
              this.channelForm.get('logo')?.setValidators([]);
              this.channelForm.get('guide')?.setValidators(channel?.guideFile.exists ? [] : [Validators.required]);
            }
            )
          )
      })
    ).subscribe();
  }

  onSelectFile(event: Event): void {

    const inputFile = event.target as HTMLInputElement;
    const file = (<FileList>inputFile.files).item(0) as File;

    //Check inpu file name
    switch (inputFile.name) {
      case 'logoFile':
        this.channelForm.get('logo')?.setValue(file);
        break;
      case 'guideFile':
        this.channelForm.get('guide')?.setValue(file);
        break;
    }
  }

  resetLogoFile(event?: Event): void {
    if (event) event.preventDefault();
    this.channelForm.get('logo')?.setValue('');
    this.formData.set('logo', '');
    (document.getElementsByName('logoFile')[0] as HTMLInputElement).value = '';
  }

  resetGuideFile(event?: Event): void {
    if (event) event.preventDefault();
    this.channelForm.get('guide')?.setValue('');
    this.formData.set('guide', '');
    (document.getElementsByName('guide')[0] as HTMLInputElement).value = '';
  }

  resetGuideLink(): void {
    this.channelForm.get('guide')?.setValue('');
    this.formData.set('guide', '');
  }

  onSubmit(): void {

    this.submitted = true;

    if(this.mode == 'new') {

      for (const [key, item] of Object.entries(this.channelForm.controls)) {

        if (key == 'guide') {
          typeof item.value === 'string'
            ? this.formData.set(`${key}`, item.value)
            : this.formData.set(`${key}`, item.value, `${this.channelForm.value.hash}.json`);
        } else if (key == 'logo') {
          this.formData.set(`${key}`, item.value, `${this.channelForm.value.hash}.png`);
        } else {
          this.formData.set(`${key}`, item.value);
        }
  
      }
      //Send data to server
      this.network.add(this.formData).subscribe((response: {executed: boolean, affectedRows: number}) => {
        if(response.executed) {
          this.channelForm.reset();
          this.resetLogoFile()
          this.resetGuideFile();
          (document.getElementById('guide_link') as HTMLInputElement).checked = true;
          this.submitted = false;
          this.showMessage(response, 'Channel has been created successfully', 'Can\'t create a new channel !');
          this.network.generateHashWithMaxOrder().subscribe(response => {
            this.channelForm.patchValue({
              hash: response.hash,
              ord: response.maxOrder + 1
            })
          })
        }
      });

    } else if(this.mode == 'edit') {

      for (const [key, item] of Object.entries(this.channelForm.controls)) {

        if (key == 'guide') {
          // console.log('Guide => ' + typeof item.value)
          typeof item.value === 'string'
            ? this.formData.set(`${key}`, item.value)
            : this.formData.set(`${key}`, item.value, `${this.channelForm.value.hash}.json`);
        } else if (key == 'logo') {
          // console.log('Logo => ' + typeof item.value)
          typeof item.value === 'string'
            ? this.formData.delete(`${key}`)
            : this.formData.set(`${key}`, item.value, `${this.channelForm.value.hash}.png`);
        } else {
          this.formData.set(`${key}`, item.value);
        }
  
      }
      //Send Data to server
      this.network.update(this.formData).subscribe((response: {executed: boolean, saved: boolean, affectedRows: number}) => {
        this.updated = response.executed;
        this.showMessage(response, 'Channel edited successfully', 'Can\'t edit the channel !');
      });

    }
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
        this.executed = undefined;
      }
    }, 3000);
    if (response.executed) {
      if (response.affectedRows > 0 || response.saved) {
        this.message = successfulMessage;
      } else if (response.affectedRows == 0) {
        this.message = 'Nothing changed'
      }
    } else {
      this.message = failureMessage;
    }
  }

  ngOnDestroy(): void {
    this.channelSubscription.unsubscribe();
  }

}
