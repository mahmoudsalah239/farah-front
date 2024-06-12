export interface SellerForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  nationalId: string;
  serviceType: string;
  city: string;
  Governorate: string;
  favoritePerson: string;
  frontImg: File | null;    
  backImg: File | null;
  profileImg: File | null;
}
