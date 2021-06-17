const func = self.onmessage = function(e) {
    console.log('Message received to anotherWorker');
    const workerResult = (e.data);
    console.log('Posting message back to main');
    self.postMessage(workerResult);
}
const funcAsString = "self.onmessage = "+func.toString();
const blob = new Blob([funcAsString], {type: "application/javascript"});
const workerService = URL.createObjectURL(blob);
export default workerService;