import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { ValidateIf } from 'class-validator';

export const defaultBoard = [
    ['o','o','o'],
    ['o','o','o'],
    ['o','o','o']
]

export type Square = null | 'x' | 'o'
export type Board = Square[][]



@Entity()
export default class Game extends BaseEntity {

    static createOne: any;
    @PrimaryGeneratedColumn() // generates ID for each game
  id?: number

  //name of game must be text
  @Column('text', {nullable:false})
  name: string

  // how to limit color choice?
  @ValidateIf(e => ['red', 'blue', 'green', 'yellow', 'magenta'].includes(e))
  @Column('text', {nullable:true})
  color: string
  

  @Column('json', { nullable: true, default: [['o','o','o'],['o','o','o'],['o','o','o']] }) // board must be of JSON type
  board: string[][]
  //board: JSON

}


    