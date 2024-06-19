import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hall-details',
  standalone: true,
  imports: [CarouselModule, CommonModule,RouterLink,FormsModule],
  templateUrl: './hall-details.component.html',
  styleUrls: ['./hall-details.component.scss'],
})
export class HallDetailsComponent implements OnInit {
  features:string = '';
  currentImage: string = '';
  hall: any; 

  thumbnails: {thumb: string, large: string}[] = [
    {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
    {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
    {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
    {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'}
    
  ];

  changeImage(imageSrc: string): void {
    this.currentImage = imageSrc;
  }

  towns: string[] = [
    'القاهرة',
    'الإسكندرية',
    'الجيزة',
    'شبرا الخيمة',
    'بورسعيد',
    'السويس',
    'المحلة الكبرى',
    'الأقصر',
    'المنصورة',
    'طنطا',
    'أسيوط',
    'الإسماعيلية',
    'الفيوم',
    'الزقازيق',
    'دمياط',
    'أسوان',
    'المنيا',
    'دمنهور',
    'بني سويف',
    'قنا',
    'سوهاج',
    'الغردقة',
    'مدينة السادس من أكتوبر',
    'شبين الكوم',
    'بنها',
    'كفر الشيخ',
    'العريش',
    'ملوي',
    'مدينة العاشر من رمضان',
    'بلبيس',
    'مرسى مطروح',
    'إدفو',
    'ميت غمر',
    'الحوامدية',
    'بلقاس',
    'قليوب',
    'أبو كبير',
    'كفر الدوار',
    'دسوق',
    'التل الكبير',
    'كفر صقر',
    'أخميم',
    'المطرية'
  ];

  cities: string[] = [
    'القاهرة',
    'الإسكندرية',
    'الجيزة',
    'شبرا الخيمة',
    'بورسعيد',
    'السويس',
    'المحلة الكبرى',
    'الأقصر',
    'المنصورة',
    'طنطا',
    'أسيوط',
    'الإسماعيلية',
    'الفيوم',
    'الزقازيق',
    'دمياط',
    'أسوان',
    'المنيا',
    'دمنهور',
    'بني سويف',
    'قنا',
    'سوهاج',
    'الغردقة',
    'مدينة السادس من أكتوبر',
    'شبين الكوم',
    'بنها',
    'كفر الشيخ',
    'العريش',
    'ملوي',
    'مدينة العاشر من رمضان',
    'بلبيس',
    'مرسى مطروح',
    'إدفو',
    'ميت غمر',
    'الحوامدية',
    'بلقاس',
    'قليوب',
    'أبو كبير',
    'كفر الدوار',
    'دسوق',
    'التل الكبير',
    'كفر صقر',
    'أخميم',
    'المطرية'
  ];

  halls = [
    { id: 1, capacity: 200, imageUrl: 'https://www.arabiaweddings.com/sites/default/files/styles/max980/public/listing/2023/08/10/royal_plaza.jpg?itok=pnzy7apt', price: '7500.00', name: 'قاعة ليلة العمر', description: 'قاعة فاخرة لليالي العمر والمناسبات الخاصة.',  city: 'القاهرة', town: 'القاهرة'},
    { id: 2, capacity: 300, imageUrl: 'https://www.ramstarab.com/wp-content/uploads/2021/12/%D8%B5%D9%88%D8%B1%D8%A9-%D9%81%D8%B1%D8%AD-17.jpg', price: '6000.00', name: 'قاعة الفرح', description: 'قاعة مميزة للاحتفالات والمناسبات.', city: 'القاهرة', town: 'القاهرة' },
    { id: 3, capacity: 400, imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgFw7SnZQ7AEx4zBwTjCM-ALnLihCUHaomWLTP9X_tF5JtjyTImG7jlPcFwTW4v8WwzBT1kHNYRTBHwJLoRu53CNF73mS_Ptus1eJ_20j9zkJ5thoVE15XYAd73NHdiP3NsictAOB3Z73bNU1s2VdD8RrGmxnQB7w05_bUxRg8OJz4EaLfRz2yMETzqip8e/s1668/318627933_704502801026406_2918971883659758944_n.jpg', price: '5000.00', name: 'قاعة الزهور', description: 'قاعة أنيقة تناسب جميع المناسبات.', city: 'القاهرة', town: 'القاهرة' },
    { id: 4, capacity: 500, imageUrl: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', price: '8500.00', name: 'قاعة النخبة', description: 'قاعة فخمة لليالي المميزة.', city: 'القاهرة', town: 'القاهرة' }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const hallId = +this.route.snapshot.paramMap.get('id')!;
    this.hall = this.halls.find(h => h.id === hallId);
    this.currentImage = this.hall.imageUrl;
  }
}