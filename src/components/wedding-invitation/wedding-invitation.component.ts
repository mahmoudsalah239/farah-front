import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wedding-invitation',
  standalone: true,
  imports: [],
  templateUrl: './wedding-invitation.component.html',
  styleUrl: './wedding-invitation.component.scss'
})
export class WeddingInvitationComponent  implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.initializeEventListeners();
  }

  initializeEventListeners(): void {
    const openElement = document.querySelector('.open') as HTMLElement;
    const oneElement = document.querySelector('.one') as HTMLElement;

    openElement.addEventListener('mouseover', () => {
      openElement.classList.toggle('opens');
    });

    oneElement.addEventListener('mouseover', () => {
      oneElement.classList.toggle('show-card');
    });
  }

}
