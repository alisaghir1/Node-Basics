
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
console.log(process.argv);
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s coding place!`)
  console.log("--------------------")
  loadTasksFromFile();
}

const fs = require('fs');

function saveTasksToFile() {
  const jsonData = JSON.stringify(tasks, null, 2);
  const filePath = process.argv[2];
  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error('Error saving tasks:');
    } else {
      console.log('Tasks have been saved');
    }
  });
}

function loadTasksFromFile() {
  const filePath = process.argv[2];

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error loading tasks:');
    } else {
      try {
        tasks = JSON.parse(data);
        console.log('Tasks have been loaded');
        listTasks();
      } catch (parseError) {
        console.error('Error parsing JSON:');
      }
    }
  });
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
  else if (text.trim() === 'edit') {    //as i did in the hello i just copied and edited them
    console.log("no edits to make");
}
else if (text.startsWith('edit ')) {
  const parts = text.split(' ');
  if (parts.length >= 3) {
    const index = parseInt(parts[1]) - 1;
    const newText = parts.slice(2).join(' ');
    editTask(index, newText);
  }
}
else if (text.startsWith('check ')) {
  const index = parseInt(text.split(' ')[1]);
  checkTask(index - 1);
} else if (text.trim() === 'check') {
  console.log('Usage: check <index>');
} else if (text.startsWith('uncheck ')) {
  const index = parseInt(text.split(' ')[1]);
  uncheckTask(index - 1);
} else if (text.trim() === 'uncheck') {
  console.log('Usage: uncheck <index>');
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
  console.log('_edit to edit a task you added' )
  console.log('_check to mark a task as done' ) 
  console.log('_uncheck to marke a task as undone' ) 
  console.log('_list to list the tasks' ) 
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
      const status = task.done ? '[✓]' : '[ ]';
      console.log(`${index + 1}. ${status} ${task.text}`);
    });
  }
}
let tasks = [];

function addTask(task, done = false) {
  if (task) {
    tasks.push({ text: task, done });
    console.log(`Task "${task}" has been added.`);
    listTasks();
    saveTasksToFile();
  } else {
    console.log('Undefined: Please provide a task to add.');
  }
}

function removeTask(task,index=-1) {  
  if(index >= 0 && index < tasks.length){
    tasks = tasks.filter((t,i)=>i != (parseInt(index) - 1));
    console.log('Task has been removed. at index: '+index);
    listTasks();
    saveTasksToFile();                   
  }
  else if(index <= 0 || index > tasks.length){
      console.log("please provide a task to remove");
  }
   else {
    tasks.pop(task);
    console.log('Task has been removed.');
    listTasks()
  }
}
function editTask(index, newText, done) {
  if (index >= 0 && index < tasks.length) {
    tasks[index].text = newText;
    tasks[index].done = done;
    console.log(`Task ${index + 1} changed to "${newText}"`);
    listTasks();
    saveTasksToFile();
  } else {
    console.log('Invalid task index.');
  }
}
// Implement the "check" and "uncheck" commands
function checkTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks[index].done = true;
    console.log(`Task ${index + 1} marked as done.`);
    listTasks();
    saveTasksToFile();
  } else {
    console.log('Invalid task index.');
  }
}

function uncheckTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks[index].done = false;
    console.log(`Task ${index + 1} marked as not done.`);
    listTasks();
    saveTasksToFile();
  } else {
    console.log('Invalid task index.');
  }
}

// The following line starts the application
startApp("ali saghir")
