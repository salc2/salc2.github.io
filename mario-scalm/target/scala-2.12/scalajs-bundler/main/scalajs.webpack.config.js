module.exports = {
  "entry": {
    "mario-fastopt": ["C:\\Users\\salc2\\IdeaProjects\\mario\\target\\scala-2.12\\scalajs-bundler\\main\\mario-fastopt.js"]
  },
  "output": {
    "path": "C:\\Users\\salc2\\IdeaProjects\\mario\\target\\scala-2.12\\scalajs-bundler\\main",
    "filename": "[name]-bundle.js"
  },
  "devtool": "source-map",
  "module": {
    "rules": [{
      "test": new RegExp("\\.js$"),
      "enforce": "pre",
      "use": ["source-map-loader"]
    }]
  }
}