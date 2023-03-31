import {
  Table,
  Column,
  Model,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DataType,
  Unique,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Default,
} from "sequelize-typescript";
import { Optional } from "sequelize";

//
import { User } from "../index.js";

interface AttributesCart {
  id: number;
  userId: number;
  sessionId: string;
  token: string;
  status: boolean;
  mobile: string;
  email: string;
  lin1: string;
  lin2: string;
  city: string;
  province: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  content: string;
}

export interface CartInput extends Optional<AttributesCart, "id"|"createdAt"|"updatedAt"> {}

@Table({
  freezeTableName: true,
  tableName: "cart",
  timestamps: true,
})
class Cart extends Model<AttributesCart, CartInput> {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Unique(true)
  @Column({ type: DataType.BIGINT })
  id!: number;

  @ForeignKey(() => User)
  userId!: number;

  @Column({ type: DataType.STRING })
  sessionId!: string;

  @Column({ type: DataType.STRING })
  token!: boolean;

  @Column({ type: DataType.STRING })
  status!: boolean;

  @Default(null)
  @Column({ type: DataType.STRING })
  mobile!: string;

  @Default(null)
  @Column({ type: DataType.STRING })
  email!: string;

  @Default(null)
  @Column({ type: DataType.STRING })
  lin1!: string;

  @Default(null)
  @Column({ type: DataType.STRING })
  lin2!: string;

  @Default(null)
  @Column({ type: DataType.STRING })
  city!: string;

  @Default(null)
  @Column({ type: DataType.STRING })
  province!: string;

  @Default(null)
  @Column({ type: DataType.STRING })
  country!: string;

  @CreatedAt
  createdAt!: string;

  @UpdatedAt
  updatedAt!: string;

  @Column({ type: DataType.TEXT("long") })
  content!: string;
}

export default Cart;
