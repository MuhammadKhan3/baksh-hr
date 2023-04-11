const cluster = require("cluster");
const os = require("os");
const app = require("./app");
const PORT = process.env.PORT;
require("dotenv").config();

// if (cluster.isMaster) {
//   // Create a worker for each CPU core
//   const numCPUs = os.cpus().length;
//   console.log(`Master process is running with PID ${process.pid}`);
//   console.log(`Forking ${numCPUs} worker processes...`);
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   // Handle worker exit event
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker process ${worker.process.pid} exited with code ${code} and signal ${signal}`);
//     console.log('Forking a new worker process...');
//     cluster.fork();
//   });
// } else {

// }

app.listen(PORT, () => {
  console.log(
    `Server started on port ${PORT} in worker process ${process.pid}`
  );
});
