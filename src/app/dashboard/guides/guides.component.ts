import { Component, OnInit } from '@angular/core';
import {GuideService} from '../../services/guide.service';
import {Program} from '../../types/guide';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.scss']
})
export class GuidesComponent implements OnInit {

  data: Program[] = [];

  constructor(private guideService: GuideService) { }

  ngOnInit(): void {
    this.guideService.read('f618fa8e27f2ded29bc0b9b494b40cd4').subscribe(guide => {
      this.data = guide.data;
      this.data.push({
        entry_id: 9999,
        content_id: 'empty',
        content_source: 'empty',
        program_type: 'empty',
        program_id : 'empty',
        program_title: 'empty',
        episode_title: 'empty',
        description: 'empty',
        rating: 'empty',
        frequency: 'empty',
        air_datetime: 'empty',
        playlist_date: 'empty',
        date: 'empty',
        time: 'empty',
        thumbnail: 'empty',
        path: 'empty'
      });
      console.log(this.data)
    })
  }

}
