import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('car')
export class carEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'timestamp',
        default:()=>'CURRENT_TIMESTAMP'
    
    })
    createdAt: number;

    @Column()
    model: String ;

    @Column("int")
    year: number ;

    @Column("int")
    power: number;
}
export class addressEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: String

    @Column("float")
    longitude: number

    @Column("float")
    latitude: number
}