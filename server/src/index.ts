// const multiplayer: string = 'Lets hope this works!'
// console.log(multiplayer)


import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import GameController from './games/controller';
import setupDb from './db'


const app = createKoaServer({
  cors: true,
  controllers: [GameController]
});

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log(`Listening on port 4000`))
  )
  .catch(err => console.error(err))