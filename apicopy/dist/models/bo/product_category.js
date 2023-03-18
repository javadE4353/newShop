var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, ForeignKey, DataType, Unique, PrimaryKey, AutoIncrement, } from "sequelize-typescript";
import Categorys from "./Category.js";
import Products from "./Product.js";
let Product_category = class Product_category extends Model {
};
__decorate([
    PrimaryKey,
    AutoIncrement,
    Unique,
    Column({ type: DataType.BIGINT }),
    __metadata("design:type", Number)
], Product_category.prototype, "id", void 0);
__decorate([
    ForeignKey(() => Products),
    Column({ type: DataType.BIGINT }),
    __metadata("design:type", Number)
], Product_category.prototype, "productId", void 0);
__decorate([
    ForeignKey(() => Categorys),
    Column({ type: DataType.BIGINT }),
    __metadata("design:type", Number)
], Product_category.prototype, "categoryId", void 0);
Product_category = __decorate([
    Table({
        freezeTableName: true,
        timestamps: true,
        tableName: "product_category",
    })
], Product_category);
export default Product_category;
//# sourceMappingURL=product_category.js.map