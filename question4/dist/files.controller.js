"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const files_service_1 = require("./files.service");
const files_schema_1 = require("./files.schema");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async getIp(source_ip) {
        console.log('IP: ', source_ip);
        return source_ip;
    }
    async uploadFile(file, request) {
        try {
            const fileInfo = {
                name: file.originalname,
                size: file.size.toString(),
                type: file.mimetype,
                extension: getFileExtension(file.originalname),
                ts_processed: new Date().toDateString(),
                source_ip: '',
                blob_path: ''
            };
            await this.fileService.createFile(fileInfo.name, fileInfo.size, fileInfo.type, fileInfo.extension, fileInfo.ts_processed, fileInfo.source_ip, fileInfo.blob_path);
            console.log(fileInfo);
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.FileController = FileController;
__decorate([
    (0, common_1.Post)('ip'),
    __param(0, (0, files_schema_1.IpAddress)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getIp", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadFile", null);
exports.FileController = FileController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [files_service_1.FileService])
], FileController);
function getFileExtension(filename) {
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1] : '';
}
//# sourceMappingURL=files.controller.js.map