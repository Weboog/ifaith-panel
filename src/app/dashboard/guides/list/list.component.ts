import { Guide } from './../../../types/guide';
import { NetworkService } from './../../../services/network.service';
import { GuideService } from './../../../services/guide.service';
import { Component, OnInit } from '@angular/core';
import { Channel } from 'src/app/types/channel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  guides: string[] = [];
  channelList: { id: string; name: string; hash: string, created?: string }[] = [];
  total: number = 0;

  constructor(
    private network: NetworkService,
    private guideService: GuideService
  ) {}

  ngOnInit(): void {
    this.guideService.getGuide('').subscribe((files: any) => {
      files.forEach((file: string) => {
        const filename = file.replace('.json', '');
        this.guides.push(filename);
        this.total = files.length;
      });
      this.getChannels();
    });
  }

  getChannels() {
    this.network.list().subscribe((channels: Channel[]) => {
      const channelsWithGuides = channels.filter((ch) =>
        this.guides.includes(ch.hash)
      );

      channelsWithGuides.forEach((ch) => {
        const fileDate = new Date(<string>ch.created_at);
        this.channelList.push({
          id: ch.id,
          name: ch.channel,
          hash: ch.hash,
          created: `${fileDate.getFullYear()}/${fileDate.getMonth() + 1}/${fileDate.getDate()}`
        });
      });
      console.log(this.channelList);
    });
  }
}
