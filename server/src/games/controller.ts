import { JsonController, Param, Get, Put, NotFoundError, Body, Post, HttpCode, BadRequestError} from 'routing-controllers'
import Game, { defaultBoard } from './entity'
import { moves } from './moves'
import { color } from './colors'


// next step is to continue implementing below
// @Validate(IsBoard, {
//     message: 'Not a valid board'
//   })
//   board: Board


  
@JsonController()
export default class GameController {
    
    @Get('/games')
    async allgames() {
      const games = await Game.find()
      return { games }
    }



    @Get('/games/:id')
    getGame(
      @Param('id') id: number
    ) {
      return Game.findOne(id)
    }
   


   
@Put('/games/:id')
async updateGame(
  @Param('id') id: number,
  @Body() update: Partial<Game>
) {
    let game = await Game.findOne(id)
  if (!game) throw new NotFoundError('Cannot find your game')

 else if (update.board && moves(update.board, game.board ) > 1){
    throw new BadRequestError(`Only one move allowed!`)
  
}

Game.merge(game, update).save()
}



@Post('/games')
@HttpCode(201)
    createGame( 
  @Body() body: Game,

) {
    
    const game : Partial<Game> = {'name': 'name', 'color': color}
    game.name= body.name
    game.board = defaultBoard
    return Game.create(game).save()
}


}


       


     //@Body() name : string
//const game : Partial<Game> = {name: name, color: getRandomColor(colorBank)},
        //if (!game || !game.name) throw new BadRequestError('A game with this name does not exist') //throw back error
     //const game = await Game.createOne({ where: { name } }) //if name exists- find game by name-