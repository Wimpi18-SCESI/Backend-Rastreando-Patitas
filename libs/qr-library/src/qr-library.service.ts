import { Injectable } from "@nestjs/common";

@Injectable()
export class QrLibraryService {
	getQrMatrix(): string {
		return "Hello World with a QR Code!";
	}
}
