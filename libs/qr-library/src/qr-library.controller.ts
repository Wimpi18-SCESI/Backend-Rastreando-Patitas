import { Controller, Get, Query } from "@nestjs/common";
import { QrLibraryService } from "./qr-library.service";

@Controller("qr-library")
export class QrLibraryController {
	constructor(private readonly qrLibraryService: QrLibraryService) {}
  @Get()
	getHello(@Query("message") message:string){
		return this.qrLibraryService.getQrMatrix(message);
	}
}