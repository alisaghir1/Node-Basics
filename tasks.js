
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name alisaghir name
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s coding place!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
const tasks = [];
function onDataReceived(text) {

  if (text === 'quit\n' || text === 'exit') {
    quit();
  }
  else if (text.startsWith('hello ')) {
    const afterHello = text.trim().substring(6); // Extract the argument after "hello"
    hello(afterHello);
  }
  else if (text === 'hello\n') { 
    hello();
  }
  else if(text === 'help\n'){     //if text is help just return the help commands to list the possible commands
    help();
  }
  else if (text === 'list\n') {
    listTasks();
  }
  else{
    unknownCommand(text);
  }
}

function help(){
  console.log('these are the commands: \n hello\n hello + your text \n quit\n exit\n help\n')  // this fucntion lists all the commands
}
/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('You dont Have any knowledge? just see the instructions by typing: help')
}


/**
 * Says hello
 *
 * @returns {void}
*/
function hello(name){
  if (name) {
    console.log(`hello ${name}!`);
  } else {
    console.log('hello!');
  }
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('You lost a good guy, bye bye')
  process.exit();
}

/**
 * Lists all the tasks
 *
 * @returns {void}
*/
function listTasks() {     //this function simply if tasks.length is 0 just print no tasks else i used for each as we used today in the weather api solution to increase the index of each task and display it
  if (tasks.length === 0) {
    console.log('No tasks to display.');
  } else {
    console.log('Tasks:');
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task}`);
    });
  }
}

// The following line starts the application
startApp("ali saghir")
