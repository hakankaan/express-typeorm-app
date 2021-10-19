import { Product } from "../product/product.entity";
import { User } from "../user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamptz' })
    created_at: Date;

    @Column()
    product_id: number

    @Column()
    user_id: number

    @ManyToOne(() => Product, product => product.orders)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User;
}