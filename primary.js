import cluster from "cluster"
import { existsSync } from "fs"
import os from "os"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const cpuCount = os.cpus().length

console.log(`O número total de CPUs são ${cpuCount}`)
console.log(`Pid Primário=${process.pid}`)
cluster.setupPrimary({
    exec: __dirname + "/index.js",
})

for (let index = 0; index < cpuCount; index++) {
    cluster.fork()
}

cluster.on("exit", (worker, code, signal) =>{
    console.log(`worker ${worker.process.pid} killed`)
    console.log(`Começando outro worker`)
    cluster.fork()
})