import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("items")
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  category: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "boolean", default: 1 })
  isAvailable: boolean;
}
