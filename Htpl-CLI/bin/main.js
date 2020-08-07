#! /usr/bin/env node
const process = require('process');
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs');
const prettier = require('prettier');
const { exec } = require('child_process');
const { JSDOM } = require('jsdom');

const command = process.argv[2] || 'help';

switch (command) {
  case 'b':
  case 'build': {
    let fileName = process.argv[3];
    if (!fileName) {
      logError('Must provide a file to build!');
    } else {
      if (!(fileName.includes('.html') || fileName.includes('.htpl'))) {
        fileName += '.htpl';
      }
      if (!fs.existsSync(fileName)) {
        logError(`File ${fileName} does not exist!`);
      } else {
        const displayCode = process.argv[4] === '--code';
        compile(fileName, '', displayCode);
      }
    }
    break;
  }
  case 'r':
  case 'run': {
    let fileName = process.argv[3];
    if (!fileName) {
      logError('Must provide a file to build!');
    } else {
      if (!fileName.includes('.js')) {
        fileName += '.js';
      }
      if (!fs.existsSync(fileName)) {
        logError(`File ${fileName} does not exist!`);
      } else {
        runCode(fileName);
      }
    }
    break;
  }
  case 'greetings': {
    greetings();
    break;
  }
  case 'help': {
    showHelp();
    break;
  }
  case 'egg':
  case 'eggs':
  case 'easter':
  case 'easter-egg':
  case 'easter-eggs':
  case 'easterEggs':
  case 'easterEgg': {
    egg();
    break;
  }
  default: {
    commandNotFound();
    break;
  }
}

function greetings() {
  console.log(chalk.yellow(figlet.textSync('Htpl-CLI', { horizontalLayout: 'full' })));
  console.log(chalk.yellow('Thank you for installing Htpl-CLI! -Andrea R.'));
  console.log('If you need help, type ' + chalk.yellow('htpl help') + '\n');
}

function showHelp() {
  console.log(chalk.yellow('Need help? At your service!'));
}

function commandNotFound() {
  logError(`Htpl-CLI command '${command}' is not a valid command`);
}

function logSuccess(message) {
  console.log(chalk.bold(chalk.green('Success: ' + message)));
}

function logError(error) {
  const stupidMessages = [
    'Maybe the cat walked on your keyboard?',
    "'But it works on my machine'",
    'Remember, anger leads to the dark side',
    "Try again, you'll be luckier",
    'Why not take a break, walk outside... No ok just kidding',
    'So, did it work?',
    'Please do not broke the keyboard. Scream quietly',
    'Ehmm, something broke at address... uhm... 0x01046AB12 more or less',
    'Try rebooting your pc. Or trash it',
    "Sorry, I'm not payed to solve your problems. Ask StackOverflow",
    'Take, read the Holy Bible: https://stackoverflow.com/',
    "This definetly IS the bug you're looking for!",
    'This should help: https://www.youtube.com/watch?v=G1IbRujko-A',
    "You should know what's wrong!",
    "'I have decided that I want to die'",
    "Don't worry, I have a plan. cmd -> shutdown -s -t 00",
    'OH NO! Anyway...',
    'You should consider a golf career',
    "You know there's something called 'documentation'?",
    'Ouch! What a mess!',
    'You really thought that piece of s\uFFFD \uFFFD \uFFFD t would work?',
    "'This is were the fun ends'",
    'I think Chancellor Palpatine is a bug lord',
    'ARE WE BLIND? Deploy the console.log()!',
  ];
  console.error(chalk.bold(chalk.red('Error: ' + error)));
  console.error(chalk.yellow(stupidMessages[Math.floor(Math.random() * stupidMessages.length)]));
}

function egg() {
  const eggs = [
    "Oh, so you're a curious person, greetings",
    'GG',
    "An egg? You think I'm a chicken?",
    "'First to the key, first to the egg!'",
    "You know we're more than one?",
    'Removed Herobine',
    "'This is were the fun begins!'",
    'Yeah, I think Jar Jar is a sith lord',
    `Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not. It’s not a story the Jedi would tell you. It’s a Sith legend.
    Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life…
    He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural.
    He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep.
    Ironic. He could save others from death, but not himself.`,
  ];
  console.error(chalk.yellow(eggs[Math.floor(Math.random() * eggs.length)]));
}

// COMPILER
function compile(fileName, outputName, displayCode = false) {
  console.log(chalk.yellow(`Starting compilation of ${fileName}...`));
  //HTML element containg code
  const fileString = fs.readFileSync(fileName, 'utf-8');
  let HTPLelement = new JSDOM(fileString).window.document.querySelector('HTPL');

  if (!HTPLelement) {
    throw `Error, HTPL element not found. Please create HTPL element in order to run HTML`;
  }
  //Compiled HTPL code
  let stringCompiled = compileElement(HTPLelement);
  if (!stringCompiled) {
    throw `Error, no code compiled but HTPL element was found. Check for HTPL-ignore class on element`;
  }
  stringCompiled = prettier.format(stringCompiled, {parser: 'babel'});
  if (displayCode) {
    logSuccess('HTPL compiled!');
    console.log(chalk.bgGray(chalk.black(`\n${stringCompiled}\n`)));
  }

  outputName = outputName || fileName.replace('.htpl', '');
  outputName = outputName.replace('.html', '');
  if (!outputName.includes('.js')) {
    outputName += '.js';
  }

  fs.writeFileSync(
    outputName,
    `// Generated by Htpl-CLI\n\n${stringCompiled}`
  );

  logSuccess(`Code compiled successfully at ${outputName}`);
}

/*function compileAndRun(displayCode = false) {
  compile(displayCode);
  runHTPL();
}*/

function compileElement(element) {
  let resultString = '';
  if (!element || !element.tagName || element.classList.contains('HTPL-ignore')) return resultString;
  switch (element.tagName.toLowerCase()) {
    //start of HTPL code
    case 'htpl': {
      resultString = `function compiledCode(){
              ${compileChildOf(element)}
          }`;
      break;
    }
    //declaration with assignment
    case 'h1': {
      let id = element.id;
      if (!id) {
        console.error('Error in: ', element);
        throw `Error in ${element} (see above): variable declaration must provide variable name (missing id)`;
      }
      resultString = `let ${id} = ${compileElement(element.children[0])}`;
      break;
    }
    //operation between two values
    case 'b': {
      if (!element.id) {
        console.error('Error in: ', element);
        throw `Error in ${element} (see above): operation must define operation type (missing id)`;
      }
      if (element.childElementCount != 2) {
        console.error('Error in: ', element);
        throw `Error in ${element} (see above): sum must have two operators (wrong numer of children)`;
      } else {
        resultString = `(${compileElement(element.children[0])} ${element.id} ${compileElement(element.children[1])})`;
      }
      break;
    }
    //value or variable name
    case 'p': {
      if (element.id) {
        resultString = `${element.id}`;
      } else resultString = `'${element.innerHTML}'`;
      break;
    }
    //assignment
    case 'h2': {
      let id = element.id;
      if (!id) {
        console.error('Error in: ', element);
        throw `Error in ${element} (see above): variable assignment must provide variable name (missing id)`;
      }
      resultString = `${id} = ${compileElement(element.children[0])};`;
      break;
    }
    //alert
    case 'cite': {
      resultString = `alert(${compileElement(element.children[0])})`;
      break;
    }
    //condition
    case 'ul': {
      if (element.childElementCount != 2 && element.childElementCount != 3) {
        console.error('Error in: ', element);
        throw `Error in ${element} (see above): if/else construct must have two or three operators (wrong number of children)`;
      }
      resultString = `if(${compileElement(element.children[0])}){
              ${compileElement(element.children[1])}
          }
          else {
              ${compileElement(element.children[2])}
          }`;
      break;
    }
    //comparison == >= <= !=
    case 'strong': {
      if (
        !element.id ||
        (element.id != '==' &&
          element.id != '!=' &&
          element.id != '<=' &&
          element.id != '>=' &&
          element.id != '<' &&
          element.id != '>' &&
          element.id != '===')
      ) {
        console.error('Error in: ', element);
        throw `Error in ${element} (see above): Comparison operations must define a valid comparison type (missing or incorrect id)`;
      }
      if (element.childElementCount != 2) {
        console.error('Error in: ', element);
        throw `Error in ${element} (see above): Comparison operation ${element.id} must have two operators (wrong number of children)`;
      }
      resultString = `(${compileElement(element.children[0])} ${element.id} ${compileElement(element.children[1])})`;
      break;
    }
    //and
    case 'and': {
      if (element.childElementCount != 2) {
        console.error('Error in: ', element);
        throw `Error in ${element} (see above): AND condition must have two operators (wrong number of children)`;
      }
      resultString = `(${compileElement(element.children[0])} && ${compileElement(element.children[1])})`;
      break;
    }
    //or
    case 'or': {
      if (element.childElementCount != 2) {
        console.error('Error in: ', element);
        throw `Error in ${element} (see above): OR condition must have two operators (wrong number of children)`;
      }
      resultString = `(${compileElement(element.children[0])} || ${compileElement(element.children[1])})`;
      break;
    }
    //not
    case 'not': {
      if (element.childElementCount != 1) {
        console.error('Error in: ', element);
        throw `Error in ${element} (see above): NOT condition must have one operator (wrong number of children)`;
      }
      resultString = `!(${compileElement(element.children[0])})}`;
      break;
    }
    //if branch
    case 'if': {
      resultString = `${compileChildOf(element)}`;
      break;
    }
    //else branch
    case 'else': {
      resultString = `${compileChildOf(element)}`;
      break;
    }
    //prompt branch
    case 'prompt': {
      resultString = `prompt('${element.id}')`;
      break;
    }

    //function declaration
    case 'div': {
      let id = element.id;
      if (!id) {
        console.error('Error in: ', element);
        throw `Error in ${element} (see above): function declaration must provide function name (missing id)`;
      }
      let params = element.classList.toString();
      resultString = `function ${id} (${params}){
              ${compileChildOf(element)}
          }`;
      break;
    }
    //function invocation
    case 'h3': {
      if (!element.id) {
        console.error('Error in: ', element);
        throw `Error in ${element} (see above): function invocation must provide function name (missing id)`;
      }
      resultString = `${element.id}(`;
      for (let i = 0; i < element.childElementCount; i++) {
        resultString += `${compileElement(element.children[i])}`;
        if (i != element.childElementCount - 1) {
          resultString += `, `;
        }
      }
      resultString += `)`;
      break;
    }
    //function return
    case 'return': {
      if (element.childElementCount != 1) {
        console.error('Error in: ', element);
        throw `Error in ${element} (see above): Return statemant must have only one child (wrong number of children)`;
      }
      resultString = `return ${compileElement(element.children[0])}`;
      break;
    }
    //while loop
    case 'while': {
      if (element.childElementCount < 2) {
        console.error('Error in: ', element);
        throw `Error in ${element} (see above): while loop must have at least one code and one condition branches (wrong number of children)`;
      }
      resultString = `while(${compileElement(element.children[0])}){
              `;
      for (let i = 1; i < element.childElementCount; i++) {
        resultString += `${compileElement(element.children[i])};
              `;
      }
      resultString += `}`;
      break;
    }
    default: {
      console.warn('Warning, element not recognized, code skipped', element);
      resultString = ``;
      break;
    }
  }
  return resultString;
}

function compileChildOf(element) {
  let resultString = ``;
  for (let i = 0; i < element.childElementCount; i++) {
    resultString += `${compileElement(element.children[i])};
      `;
  }
  return resultString;
}

function runCode(fileName) {
  console.log(chalk.yellow(`Running ${fileName}...`));
  const child = exec(`node ${fileName}`);
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  child.addListener('exit', (code) => {
    console.log(chalk.yellow(`Script finished with code ${code}`));
  });
}
