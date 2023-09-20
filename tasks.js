
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
function onDataReceived(text) {
  
  if (text === 'quit\n' || text === 'exit\n') {
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
  else if (text.startsWith('add ')) {
    const taskToAdd = text.trim().substring(4); // Extract the argument after "add"
    addTask(taskToAdd);
}
  else if (text.trim() === 'add') {      //as i did in the hello i just copied and edited them
    addTask();
}
  else if (text.trim() === 'remove') {    //as i did in the hello i just copied and edited them
      removeTask();
  }
  else if (text.startsWith('remove ')) {
    const index = text.split(' ')[1] // Extract the argument after "remove"
    removeTask(null,index);
  }
  else{
    unknownCommand(text);
  }
}

function help(){
  console.log('These are the commands: ');
  console.log('_hello to say hello back' ) 
  console.log('_hello + text to say hello back plus the text') 
  console.log('_add to add tasks to a list' ) 
  console.log('_remove to remove the tasks from the list' )  // this fucntion lists all the commands
  console.log('_remove plus index number of the task to remove a specific task ' ) 
  console.log('_exit/quit to quit the application ' ) 
  console.log('_help to list all these commands' ) 
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

function hello(name){
  if (name) {
    console.log(`hello ${name}!`);
  } else {
    console.log('hello!');
  }
}

function quit(){
  console.log('You lost a good guy, bye bye')
  process.exit();
}

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
let tasks = [];

function addTask(task) {                      //similar to the hello fucntion above i just changed the names
  if (task) {
    tasks.push(task);
    console.log(`Task "${task}" has been added.`);
    listTasks()
  } else {
    console.log('Undefined: Please provide a task to add.');
  }
}

function removeTask(task,index=-1) {  
  if(index >= 0 && index < tasks.length){
    tasks = tasks.filter((t,i)=>i != (parseInt(index) - 1));
    console.log('Task has been removed. at index: '+index);
    listTasks()                   //similar to the hello fucntion above i just changed the names
  } else {
    tasks.pop(task);
    console.log('Task has been removed.');
    listTasks()
  }
}


// The following line starts the application
startApp("ali saghir")
