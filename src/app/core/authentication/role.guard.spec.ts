import { TestBed } from '@angular/core/testing';
import { RoleGuard } from './role.guard';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../http/auth.service';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let route: ActivatedRouteSnapshot;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'getUserRole']);
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);
    route = new ActivatedRouteSnapshot();
    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    guard = TestBed.inject(RoleGuard);
  });

  it('should allow user with correct role', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);
    authServiceSpy.getUserRole.and.returnValue('admin');
    route.data = { roles: ['admin'] };
    expect(guard.canActivate(route)).toBeTrue();
  });

  it('should redirect user with wrong role', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);
    authServiceSpy.getUserRole.and.returnValue('client');
    route.data = { roles: ['admin'] };
    routerSpy.createUrlTree.and.returnValue('/signIn');
    expect(guard.canActivate(route)).toBe('/signIn');
  });
});
