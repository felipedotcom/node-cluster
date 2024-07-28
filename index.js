import express from "express"

const port = 3000
const app = express()

app.get("/intensive", (req, res) => {
    let total = 0
    for (let index = 0; index < 50_000_000; index++) {
        total++
    }
    res.send(`O resultado da sobrecarga da CPU é ${total}\n`)
})

app.listen(port, ()=> {
    console.log(`Ouvindo na porta ${port}`)
    console.log(`pid=${process.pid}`)
})