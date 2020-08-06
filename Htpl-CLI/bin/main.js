#! /usr/bin/env node
const process = require('process');
const chalk = require('chalk');
const figlet = require('figlet');

const command = process.argv[2] || 'help';

switch (command) {
  case 'greetings': {
    greetings();
    break;
  }
  case 'help': {
    showHelp();
    break;
  }
  default: {
    commandNotFound();
    break;
  }
}

function greetings() {
  console.log(chalk.yellow(figlet.textSync('Htpl-CLI', { horizontalLayout: 'full' })));
  console.log(chalk.yellow('Thank you for installing Htpl-CLI! -Andrea R.\n'));
}

function showHelp() {
  console.log(chalk.yellow('Need help? At your service!'));
}

function commandNotFound() {
  console.error(chalk.bold(chalk.red(`Error: Htpl-CLI command '${command}' is not a valid command\nMaybe the cat walked on your keyboard?`)));
}
