//command line app in nodejs



var username= process.argv[2];
if(!username){
    var appName=process.argv[1].split(require('path').sep).pop();
    console.error(`Missing argument ! Example : ${appName} is required` );
    process.exit(1);
}

console.log(`Hello, ${username}`);

