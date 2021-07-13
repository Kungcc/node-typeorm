import {ConnectionOptions} from 'typeorm'
import {Auth, Role} from '../models'

const config : ConnectionOptions = {
  type: "mariadb",
  host: process.env.POSTGRES_HOST || "10.36.1.125",
  port: Number(process.env.POSTGRES_PORT) || 3306,
  username: process.env.POSTGRES_USER || "root",
  password: process.env.POSTGRES_PASSWORD || "mypass",
  database: process.env.POSTGRES_DB || "node_test",
  entities: [Auth, Role],
  synchronize: true,
  timezone: "Z"
}

export default config
