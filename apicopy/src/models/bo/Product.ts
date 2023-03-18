import {
  Model,
  DataType,
  Column,
  Table,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  Unique,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsToMany,
  Default,
  HasOne,
  BelongsTo,
} from "sequelize-typescript";
import  {Optional}  from "sequelize";
import  Categorys  from "./Category.js";
import  Product_category from "./product_category.js";
import {Product_review, User} from "../index.js";

export interface AttributesProduct {
  id: number;
  userId: number;
  categoryId?: number;
  title: string;
  metatitle?: string;
  slug?: string;
  summary?: string;
  type: number;
  sku: string;
  price: number;
  discount?: number;
  quantity: number;
  shop: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  content?: string;
}

//
export interface OutPutProductsOnCategory {
  id: number;
  userId: number;
  title: string;
  metatitle?: string;
  slug?: string;
  summary?: string;
  type: number;
  sku: string;
  price: number;
  discount?: number;
  quantity: number;
  shop: number;
  content?: string;
}

export interface UpdateProduct {
  title?: string;
  metatitle?: string;
  slug?: string;
  summary?: string;
  type?: number;
  price?: number;
  discount?: number;
  quantity?: number;
  shop?: number;
  content?: string;
  categoryId?: number;
}

export interface ProductInput extends Optional<AttributesProduct, "id"> {}

@Table({
  freezeTableName: true,
  timestamps: true,
  tableName: "products",
})
export default  class Products extends Model<AttributesProduct, ProductInput> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column({ type: DataType.BIGINT })
  id!: number;

  @AllowNull(false)
  @Unique
  @Column({ type: DataType.STRING(100) })
  title!: string;

  @Default(null)
  @Column({ type: DataType.STRING(100) })
  metatitle!: string;

  @Default(null)
  @Column({ type: DataType.STRING(100) })
  slug!: string;

  @Default(null)
  @Column({ type: DataType.STRING(100) })
  summery!: string;

  @Column({ type: DataType.SMALLINT })
  type!: number;

  @AllowNull(false)
  @Unique
  @Column({ type: DataType.STRING(100) })
  sku!: string;

  @Column({ type: DataType.FLOAT })
  price!: number;

  @Default(0)
  @Column({ type: DataType.FLOAT })
  discount!: number;

  @Column({ type: DataType.SMALLINT })
  quantity!: number;

  @AllowNull(false)
  @Column({ type: DataType.TINYINT })
  shop!: number;

  @Default(null)
  @Column({ type: DataType.TEXT })
  content!: string;

  @ForeignKey(() => User)
  userId!: number;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @DeletedAt
  deletedAt!: Date;
  
  @BelongsToMany(() => Categorys, {
    through: { model: () => Product_category },
  })
  categorys!: Categorys[];

  @HasOne(()=>Product_review)
  review!:Product_review

  @BelongsTo(()=>User)
  user!:User;
}
