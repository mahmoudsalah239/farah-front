export interface OwnerRegisterResponse {
  data: {
    notSeenServicesCount: number;
    notSeenRegisteredOwners: number;
    notSeenMessages: number;
    message: string;
    isEmailConfirmed: boolean;
    succeeded: boolean;
    name: string;
    email: string;
    role: string;
    token: string;
    accountStatus: any;
    isBlocked: boolean;
    expireTime: string;
    errors: any;
    fullName: any;
    profileImage: any;
  };
  message: string;
  succeeded: boolean;
  errors: any;
  paginationInfo: any;
}
