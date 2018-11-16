# Notes

1. webpack打包less，使用ExtractPlugin，style-loader和postcss-loader报错

  ```javascript
  {
       test: /\.(less)/,
       use: ExtractTextPlugin.extract({
         fallback: 'style-loader',
         use: [{
             loader: 'css-loader',
             options: {
               importLoaders: 1,
               minimize: true
             },
           },
           'postcss-loader',
           {
             loader: 'less-loader',
             options: {
               lessPlugins: [
                 new LessPluginCleanCSS({
                   advanced: true,
                 }),
               ],
             },
           }
         ]
       }),
     },
  ```
