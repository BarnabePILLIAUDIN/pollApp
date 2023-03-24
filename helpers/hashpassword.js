import { pbkdf2Sync, randomBytes } from "crypto"
import config from "../config.js"

const hashPassword = (
  password,
  salt = randomBytes(config.password.saltLen).toString("hex")
) => [
  pbkdf2Sync(
    password,
    salt,
    config.password.iterations,
    config.password.keylen,
    config.password.digest
  ).toString("hex"),
  salt,
]

export default hashPassword
