"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpAddress = exports.FileSchema = void 0;
const mongoose = require("mongoose");
const common_1 = require("@nestjs/common");
exports.FileSchema = new mongoose.Schema({
    name: String,
    size: String,
    type: String,
    extension: String,
    ts_processed: String,
    source_ip: String,
    blob_path: String,
});
exports.IpAddress = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return req.clientIp || null;
});
//# sourceMappingURL=files.schema.js.map