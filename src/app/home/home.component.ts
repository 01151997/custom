import { Component, OnInit , ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-hello-world',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  
  }

  
}
