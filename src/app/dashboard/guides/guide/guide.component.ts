import { NetworkService } from './../../../services/network.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { Channel } from 'src/app/types/channel';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
})
export class GuideComponent implements OnInit {
  @ViewChild('guideModel', { read: ElementRef })
  guideEl!: ElementRef;
  step: number = 0;
  filename: string = '';
  submitted: boolean = false;
  channelList: { id: string; name: string; hash: string }[] = [];
  guide!: { guide_title: string; channel: string; programs: Object[] };
  // shakeBox: boolean = false;     // TODO: add to Form Model:  [ngClass]="{'shakeBox': shakeBox}"

  constructor(private network: NetworkService) {}

  ngOnInit(): void {
    this.network.list().subscribe((channels: Channel[]) => {
      channels.forEach((channel) => {
        this.channelList.push({
          id: channel.id,
          name: channel.channel,
          hash: channel.hash,
        });
      });
    });

  }

  onNext(form: NgForm) {
    let formObj = form.value.guideModel;
    this.step++;
    this.guideEl.nativeElement.style.display = 'none';

    this.guide = {
      guide_title: formObj.guide_title,
      channel: formObj.channel,
      programs: [],
    };
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0)
      this.filename = event.target.files[0].name;
  }

  resetFile(form: NgForm, event: any) {
    if (event) event.preventDefault();
    this.setInvalid(form, 'thumbnail');
    form.value.program.thumbnail = '';
    this.filename = '';
  }

  onAdd(form: NgForm) {
    this.step++;
    // this.shakeBox = (form.valid && this.step !== 0) ? true : false;
    const progs = form.value.program;

    this.guide.programs.push({
      program_title: progs.program_title,
      air_datetime: progs.air_datetime,
      thumbnail: progs.thumbnail,
    });

    ['program_title', 'air_datetime', 'thumbnail'].forEach((el) => {
      const inp = document.getElementById(el) as HTMLInputElement;
      inp.value = '';
      this.setInvalid(form, el);
    });

    this.filename = '';
  }

  onCancel(event: Event): void {
    event.preventDefault();
    history.back();
  }

  setInvalid(form: NgForm, element: string) {
    (form.form.get('program') as FormGroup).controls[element].setErrors({
      invalid: true,
    });
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    const progs = form.value.program;

    this.guide.programs.push({
      program_title: progs.program_title,
      air_datetime: progs.air_datetime,
      thumbnail: progs.thumbnail,
    });

    return this.guide;
  }
}
