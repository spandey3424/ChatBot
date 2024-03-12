/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChatResponseService } from './chat-response.service';

describe('Service: ChatResponse', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatResponseService]
    });
  });

  it('should ...', inject([ChatResponseService], (service: ChatResponseService) => {
    expect(service).toBeTruthy();
  }));
});
