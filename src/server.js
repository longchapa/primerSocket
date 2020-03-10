/** Dependencies */
const app = require("./appConfig");
const server = require("http").createServer(app);

server.listen(app.get("PORT"), () => {
  console.log(`Listen on ${process.env.PATH_SERVER}`);
});
