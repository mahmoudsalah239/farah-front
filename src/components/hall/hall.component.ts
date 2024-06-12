import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-hall',
  standalone: true,
  imports: [ RouterLinkActive, CommonModule,FormsModule,],
  templateUrl: './hall.component.html',
  styleUrl: './hall.component.scss',
})
export class HallComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}