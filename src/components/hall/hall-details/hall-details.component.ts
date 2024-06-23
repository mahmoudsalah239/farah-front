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
  features: string = '';
  currentImage: string = '';
  hall: any;

  thumbnails: any[] =[];

  changeImage(imageSrc: string): void {
    this.currentImage = imageSrc;
  }


  constructor(
    private route: ActivatedRoute,
    private hallService: HallService
  ) {}

  ngOnInit(): void {
    this.getHall();
    if (this.hall.pictureUrls && this.hall.pictureUrls.length > 0) {
      this.currentImage = 'https://localhost:44322' + this.hall.pictureUrls[0];
    }

    // تهيئة الصور المصغرة
    // this.thumbnails = this.hall.pictureUrls.map(url => ({
    //   thumb: 'https://localhost:44322' + url,
    //   large: 'https://localhost:44322' + url
    // }));
  
  }

  getHall() {
    const hallId = +this.route.snapshot.paramMap.get('id')!;
    // this.hall = this.halls.find((h) => h.id === hallId);
    
    this.hallService.GetHallById(hallId).subscribe({
      next: (res) => {
        console.log(res);
        this.hall = res.data
        this.currentImage = 'https://localhost:44322/${ this.hall.pictureUrls[0] }'
      },
    });
  }
}
