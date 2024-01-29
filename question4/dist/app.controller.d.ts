import { UploadedFileMetadata } from '@nestjs/azure-storage';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    upload(file: UploadedFileMetadata): Promise<string>;
    private getFileExtension;
}
