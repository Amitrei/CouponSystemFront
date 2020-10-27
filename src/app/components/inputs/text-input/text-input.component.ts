import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Input()
  placeHolderText = ' ';

  @Input()
  iconSrc: string;

  @Input()
  inputType = 'text';

  @Input()
  inputName = 'inputText';

  @Output()
  inputNgModel = new EventEmitter();

  @Input()
  isValid = true;

  isEmail = false;

  constructor() {}

  ngOnInit(): void {
    if (this.inputType == 'email') {
      this.isEmail = true;
    }
  }

  onChange(value) {
    this.inputNgModel.emit(value);
  }
}
