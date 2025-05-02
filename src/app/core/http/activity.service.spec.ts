import { TestBed } from '@angular/core/testing';
import { ActivityService } from './activity.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ActivityService', () => {
  let service: ActivityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivityService],
    });
    service = TestBed.inject(ActivityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get activities', () => {
    const mockActivities = [{ id: '1', name: 'Atividade' }];
    service.getActivities().subscribe((activities) => {
      expect(activities).toEqual(mockActivities);
    });
    const req = httpMock.expectOne('/api/activities');
    expect(req.request.method).toBe('GET');
    req.flush(mockActivities);
  });
});
