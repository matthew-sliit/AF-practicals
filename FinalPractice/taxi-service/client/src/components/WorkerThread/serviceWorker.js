// worker.js
const workercode = () => {
    self.onmessage = function(e) {
        console.log('Message received from main');
        const workerResult = (e.data*4000);
        console.log('Posting message back to main');
        self.postMessage(workerResult);
    }
};
let code = workercode.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;