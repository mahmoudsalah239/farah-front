import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [ CommonModule, RouterLink, FormsModule],
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent implements OnInit {




  features: string = '';
  currentImage: string = '';
  car: any; 

  thumbnails: {thumb: string, large: string}[] = [
    {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
    {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
    {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
    {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
    {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
    {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
    {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
    {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
    {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
    {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'}
  ];

  changeImage(imageSrc: string): void {
    this.currentImage = imageSrc;
  }

  cars = [
    { id: 1, year: 2021, imageUrl: 'https://www.topgear.com/sites/default/files/2023/08/P90492179_highRes_bmw-i7-xdrive60-m-sp%20%281%29.jpg', price: 'السعر', brand: 'العلامة التجارية', description: 'الوصف' },
    { id: 2, year: 2010, imageUrl: 'https://carwow-uk-wp-3.imgix.net/front-1-RS6-Etron-2-e1674560152374.png?auto=format&cs=tinysrgb&fit=crop&h=800&ixlib=rb-1.1.0&q=60&w=1600', price: 'السعر', brand: 'العلامة التجارية', description: 'الوصف' },
    { id: 3, year: 2020, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/2022-kia-forte-gt-104-1633972551.jpg?crop=0.686xw:0.515xh;0.0943xw,0.217xh&resize=1200:*', price: 'السعر', brand: 'العلامة التجارية', description: 'الوصف' },
    { id: 4, year: 2011, imageUrl: 'https://www.egy-car.com/wp-content/uploads/2020/09/%D9%87%D9%8A%D9%88%D9%86%D8%AF%D8%A7%D9%8A-%D8%A7%D9%84%D9%86%D8%AA%D8%B1%D8%A7-CN7-1-600x400.jpg', price: 'السعر', brand: 'العلامة التجارية', description: 'الوصف' }
  ];

  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    const carId = +this.route.snapshot.paramMap.get('id')!;
    this.car = this.cars.find(c => c.id === carId);
    if (this.car) {
      this.currentImage = this.car.imageUrl;
    }
  }
}
