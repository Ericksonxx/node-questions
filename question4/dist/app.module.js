"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const azure_storage_1 = require("@nestjs/azure-storage");
const database_module_1 = require("./database.module");
const files_controller_1 = require("./files.controller");
const files_service_1 = require("./files.service");
const files_schema_1 = require("./files.schema");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'File', schema: files_schema_1.FileSchema }]),
            azure_storage_1.AzureStorageModule.withConfig({
                sasKey: '?sv=2023-01-03&ss=btqf&srt=sco&st=2024-01-28T20%3A53%3A48Z&se=2024-01-29T20%3A53%3A48Z&sp=rwdlcp&sig=0X15s5%2FMSMVWBR6%2BU2sU73y21VPKZRtRAlMgbPBgIT8%3D',
                accountName: 'devstoreaccount1',
                containerName: 'test',
                connectionString: 'UseDevelopmentStorage=true;DevelopmentStorageProxyUri=http://127.0.0.1',
            }),
        ],
        controllers: [files_controller_1.FileController],
        providers: [files_service_1.FileService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map