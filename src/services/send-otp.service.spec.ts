import { TestBed } from '@angular/core/testing';

import { SendOtpService } from './send-otp.service';

describe('SendOtpService', () => {
  let service: SendOtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendOtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
