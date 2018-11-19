# allChat

The project [allChat](https://github.com/PorYoung/allChat) is one of components of project [hifi_wechat](https://github.com/PorYoung/hifi_wechat) which based on nodejs `express` frame, `wechat SDK` and `socket.io`. In this project I rewrite it with [egg.js](https://eggjs.org/), added some new features and optimized. I only spend 3 days to re-construct the project, maybe there are many problems remained. If you find any bugs, wish you can concat me or help me fix it. Thanks!.

You might need to know [egg.js](https://eggjs.org/) and [webpack](https://webpack.js.org/) first.

## QuickStart

<!-- add docs here for user -->

It's easy to start allChat on your computer. Please notice that my nodejs version is `8.9.0`.

1. Fetch allChat.
  ```
  $ git clone https://github.com/PorYoung/allChat.git
  ```
2. Go to the project directory and install dependencies.
  ```
  $ npm i
  ```
3. You might need use `webpack-cli` to build static files.
  ```
  $ npm i webpack-cli -g
  $ npm run build
  ```
4. run egg.js project
  ```
  $ npm run dev
  ```
5. Don't forget the database which I used [mongodb](www.mongodb.org/), install it and start it directly, the connection configuration is in `config/config.default.js`. It's `egg-mongoose` here, which help you use [mongoose](https://mongoosejs.com/) in egg app.
  ```javascript
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/chat',
      options: {},
    },
  };
  ```


see [egg docs][egg] and [webpack docs](https://webpack.js.org/concept) for more detail.

### Npm Scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.
- Use `npm run watch` to start webpack-cli watch.

### Structure

- `app`: server end code, see [egg Directory Structure](https://eggjs.org/en/basics/structure.html) for more detail.
- `build`: which contain the webpack config file and web front-end code. See webpack docs for configuration help.
- `.vscode`: VS Code configuration, that's not important.
- `config`: egg app configuration, see [egg Configuration](https://eggjs.org/en/basics/config.html) for more detail.
- `log`: log files.
- `test`: egg unit test.

### Some Dependencies

- `socket.io`: websocket frame, *FEATURING THE FASTEST AND MOST RELIABLE REAL-TIME ENGINE*, [see its website](https://socket.io/).
- `egg-mongoose`: use mongoose in egg.
- `egg-ejs`: use `ejs` to render html file.
- `bootstrap`, `jquery` and other the third part plugin for web front pages, and `underscroe` can be removed when you replace `_.compile()` with `${}`.
- etc.

### Other Tips

- the Server default listening port is `7001`
- the socket client connect to host `127.0.0.1`, you might to modify it if you need to run not at your local computer.
- waiting for updating...

### Questions & Suggestions

Please open an issue [here](https://github.com/PorYoung/allChat/issues).

### License

[MIT](https://github.com/PorYoung/allChat/blob/master/LICENSE)