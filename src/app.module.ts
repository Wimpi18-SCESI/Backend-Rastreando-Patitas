import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { QrLibraryModule } from "@app/qr-library";

@Module({
	imports: [QrLibraryModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
