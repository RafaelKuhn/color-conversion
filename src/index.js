const { startConsoleApp } = require("./console-app-lib/console-app/console_app");

if (require.main === module) {
  startConsoleApp();
} else {
  module.exports = startConsoleApp;
}