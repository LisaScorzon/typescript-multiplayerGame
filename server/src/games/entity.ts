import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator';


@Entity()
export default class Game extends BaseEntity {

    @PrimaryGeneratedColumn() // generates ID for each game
  id?: number

  @IsString() //name of game must be a string, text
  @Column('text', {nullable:false})
  name: string

  @IsString() // color must be string, how to limit color choice?
  @Column('text', {nullable:false})
  color: string


  @Column('json', { nullable: false }) // board must be of JSON type
  board: JSON

}