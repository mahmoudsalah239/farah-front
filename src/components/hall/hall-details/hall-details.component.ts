import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HallService } from '../../../services/hall.service';

@Component({
  selector: 'app-hall-details',
  standalone: true,
  imports: [CarouselModule, CommonModule, RouterLink, FormsModule],

  templateUrl: './hall-details.component.html',
  styleUrls: ['./hall-details.component.scss'],
})
export class HallDetailsComponent implements OnInit {
  hall: any; // Define hall object
  images: any[] = []; // Array to hold carousel images
  activeSlideIndex = 0; // Index of active slide
  constructor(
    private route: ActivatedRoute,
    private hallService: HallService
  ) {}

  ngOnInit(): void {
    const hallId:any = this.route.snapshot.paramMap.get('id'); // Assuming id is passed via route parameter
console.log(hallId);

    // Example: Fetch hall details including images from API
    this.hallService.GetHallById(hallId).subscribe({
     next: (data: any) => {
      this.hall = data.data; // Assuming API response structure matches the provided JSON
      console.log(data.pictureUrls);
      
      this.images = this.hall.pictureUrls?.map((url: string) => ({
        path: 'https://localhost:44322' + url,
        caption: this.hall.name 
      }) );
      console.log(this.images);
      
    },error: (error) => {
      console.error('Error fetching hall details', error);
    }});
  }

  prevSlide(): void {
    this.activeSlideIndex = this.activeSlideIndex === 0 ? this.images.length - 1 : this.activeSlideIndex - 1;
  }

  // Function to navigate to next slide
  nextSlide(): void {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.images.length;
  }
}
