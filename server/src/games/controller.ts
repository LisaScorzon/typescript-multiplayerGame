import { JsonController, Param, Get, Put, NotFoundError, Body, Post, HttpCode} from 'routing-controllers'
import Game from './entity'

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
async updateProduct(
  @Param('id') id: number,
  @Body() update: Partial<Game>
) {
  const game = await Game.findOne(id)
  if (!game) throw new NotFoundError('Cannot find your game')

  return Game.merge(game, update).save()
}


@Post('/games')
@HttpCode(201)
 createGame(
  @Body() game: Game
) {

  return game.save()
}


}