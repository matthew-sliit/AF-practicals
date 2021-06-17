export default function(e) {
    console.log('Got message');
    const workerResult = (e.data);
    console.log('sending message back');
    self.postMessage(workerResult);
}