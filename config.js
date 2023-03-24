import "dotenv/config"

const config = {
  password: {
    saltLen: 128,
    iterations: 10000,
    keylen: 128,
    digest: "sha512",
  },
}

export default config
