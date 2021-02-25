import { Component, Input, OnInit } from '@angular/core';
import { IPostagem } from 'src/app/interfaces/IPostagem';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() postagens : IPostagem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
