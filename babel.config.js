module.exports = {
  presets: ['@vue/cli-plugin-babel/preset',
    [
      "@babel/preset-env",
      {
        "corejs": {
          version: 3,
          proposals: true
        },
        "useBuiltIns": "entry"
      }
    ]
  ],
  plugins: [
    'lodash',
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: 'css'
      }
    ], // `style: true` 会加载 less 文件
    ["@babel/plugin-transform-runtime"]
  ]
}
