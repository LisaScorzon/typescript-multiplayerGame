import { createConnection } from 'typeorm'
import { DefaultNamingStrategy } from 'typeorm/naming-strategy/DefaultNamingStrategy'
import { NamingStrategyInterface } from 'typeorm/naming-strategy/NamingStrategyInterface'
import { snakeCase } from 'typeorm/util/StringUtils'
import Game from './games/entity';



class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {

  tableName(targetName: string, gameSpecifiedName: string): string {
    return gameSpecifiedName ? gameSpecifiedName : snakeCase(targetName) + 's';
  }

  columnName(gameName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(embeddedPrefixes.concat(customName ? customName : gameName).join("_"));
  }

  columnNameCustomized(customName: string): string {
    return customName;
  }

  relationName(gameName: string): string {
    return snakeCase(gameName);
  }
}

export default () =>
createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres',
    entities: [
      Game
    ],
    synchronize: true, // automatically synchronizes new tables with postico-should not be used in production!
    logging: true,
    namingStrategy: new CustomNamingStrategy()
  })

  .then(_ => console.log('Connected to Postgres with TypeORM'))

  