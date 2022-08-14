import { NetworkService } from './../../../services/network.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Channel } from 'src/app/types/channel';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
})
export class GuideComponent implements OnInit {
  @ViewChild('guide', { read: ElementRef })
  guide!: ElementRef;
  step: Number = 1;
  filename: string = '';
  submitted: boolean = false;
  list: Object[] = [];

  constructor(private network: NetworkService) {}

  ngOnInit(): void {
    this.network.list().subscribe((channels: Channel[]) => {
      channels.forEach((channel) => {
        this.list.push({
          id: channel.id,
          name: channel.channel,
          hash: channel.hash,
        });
      });
    });
  }

  showProg(){
    this.step = 0;
    this.guide.nativeElement.style.display = 'none';
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.filename = event.target.files[0].name;
    }
  }

  resetFile(form: any, event: any) {
    if (event) event.preventDefault();
    form.value.thumbnail = '';
    this.filename = '';
  }

  onCancel(event: Event): void {
    event.preventDefault();
    history.back();
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    return form.value;
  }
}
