import { Controller, Get } from "@nestjs/common";
import { QrLibraryService } from "./qr-library.service";

@Controller("qr-library")
export class QrLibraryController {
	constructor(private readonly qrLibraryService: QrLibraryService) {}
  @Get()
	getHello(): string {
		return this.qrLibraryService.getQrMatrix();
	}
}