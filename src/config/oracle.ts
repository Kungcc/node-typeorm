import {ConnectionOptions} from 'typeorm'
import {Auth, Role} from '../models'

const config : ConnectionOptions = {
  type: "oracle",
  host: process.env.POSTGRES_HOST || "127.0.0.1",
  port: Number(process.env.POSTGRES_PORT) || 1521,
  username: process.env.POSTGRES_USER || "sys",
  password: process.env.POSTGRES_PASSWORD || "Oradoc_db1",
  sid: "ORCLCDB",
  entities: [Auth, Role],
  synchronize: true
}

export default config
