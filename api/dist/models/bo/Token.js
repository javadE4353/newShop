var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType, ForeignKey, } from "sequelize-typescript";
import User from "./User.js";
let Token = class Token extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], Token.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Token.prototype, "name", void 0);
__decorate([
    ForeignKey(() => User),
    Column,
    __metadata("design:type", Number)
], Token.prototype, "userId", void 0);
Token = __decorate([
    Table({
        freezeTableName: true,
        tableName: "tokens",
        timestamps: true,
    })
], Token);
export default Token;
//# sourceMappingURL=Token.js.map