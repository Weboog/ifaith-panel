import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

interface Settings {
  summary: {
    default: string,
    bgColor: string,
    color: string
  },
  options: {
    bgColor: string,
    color: string,
    selectedHighlightColor: string
  }
}

interface Option {
  value: string | number,
  label: string
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnChanges {

  @Input() default: number | string | undefined;
  @Input() settings!: Settings;
  @Input() options: Option[] | undefined;
  @Output() change = new EventEmitter<string | number>();
  ///////////////////--------------------------////////////////
  summary = 'Select category';
  selectedElement!: string;
  open = false;
  ///////////////////--------------------------////////////////
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.default != undefined) {
      this.selectedElement = <string>this.default;
      const elem = this.options?.find(item => item.value == <string>this.default);
      this.summary = <string>elem?.label;
    }

  }

  ngOnInit(): void {
  }

  toggleOpen(): void {
    this.open = !this.open;
  }

  onSelect(event: Event): void {
    const selectedElement = event.target as HTMLOptionElement;
    this.summary = <string>selectedElement.dataset.label;
    this.selectedElement = <string>selectedElement.dataset.value;
    this.open = false;
    this.change.emit(selectedElement.dataset.value);
  }

}
