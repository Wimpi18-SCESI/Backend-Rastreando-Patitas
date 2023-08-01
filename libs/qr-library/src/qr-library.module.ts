import { Module } from '@nestjs/common';
import { QrLibraryService } from './qr-library.service';

@Module({
  providers: [QrLibraryService],
  exports: [QrLibraryService],
})
export class QrLibraryModule {}
