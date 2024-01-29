/// <reference types="multer" />
import { FileService } from './files.service';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    getIp(source_ip: string): Promise<string>;
    uploadFile(file: Express.Multer.File, request: Request): Promise<void>;
}
