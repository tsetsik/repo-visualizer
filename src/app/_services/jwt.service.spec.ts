import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { JwtService } from './jwt.service';

describe('JwtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JwtService = TestBed.get(JwtService);
    expect(service).toBeTruthy();
  });
});
