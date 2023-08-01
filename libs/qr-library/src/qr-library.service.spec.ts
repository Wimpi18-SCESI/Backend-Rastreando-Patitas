import { Test, TestingModule } from '@nestjs/testing';
import { QrLibraryService } from './qr-library.service';

describe('QrLibraryService', () => {
  let service: QrLibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QrLibraryService],
    }).compile();

    service = module.get<QrLibraryService>(QrLibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
