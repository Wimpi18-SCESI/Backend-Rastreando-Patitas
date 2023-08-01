import { Module } from "@nestjs/common";
import { QrLibraryService } from "./qr-library.service";
import { QrLibraryController } from "./qr-library.controller";

@Module({
	providers: [QrLibraryService],
	exports: [QrLibraryService],
	controllers: [QrLibraryController],
})
export class QrLibraryModule {}
