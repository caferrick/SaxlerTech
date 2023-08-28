import { TestBed, inject } from '@angular/core/testing';


import {HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SecurityService } from './security.service';
import { SharedService } from '../services/shared.service';
//import { User } from '../models/User';
import { SecuredUser } from '../security/securedUser';


describe('SecurityService', () => {

  let user : SecuredUser;
  let configService : SharedService;
  let httpClient : HttpClient;
  let securityService : SecurityService;
  let httpMock: HttpTestingController;


    beforeEach(() => {

      this.user= new SecuredUser();
      this.user.uid = "LIDXXXX";

      TestBed.configureTestingModule({
        providers: [SecurityService,
                    SharedService],
        imports: [HttpClientTestingModule],


      });

      securityService = TestBed.get(SecurityService);
      httpMock = TestBed.get(HttpTestingController);
      configService = TestBed.get(SharedService);

    });

  it('should be created', inject([SecurityService], (service: SecurityService) => {
    expect(service).toBeTruthy();
  }));


  it('Seting the user object', () => {
     console.log("Seting the UserObject :"+JSON.stringify(this.user));
     securityService. initUserObject();
  });





  it('Getting the user object', () => {
    securityService.setUser(this.user);
    const result = JSON.stringify(securityService.getUser());
    expect(result).toContain("LID");
  });





  it('should get user info from API via Get', () => {

      const HMUserAttributes = {
        HMUserAttributes: {
          uid: "lidxxxxx",
          givenname: "Test",
          sirName: "Foobar"
        }
      }

        const dummyPost = HMUserAttributes
        securityService.initUserObject('lidXXXX').subscribe(userObj => {
        const result = JSON.stringify(userObj);

        expect(result).toContain('lid');

      });

      const request = httpMock.expectOne(configService.getURI("getUser")+'lidXXXX');

      expect(request.request.method).toBe('GET');
      request.flush(dummyPost);

   });

});
