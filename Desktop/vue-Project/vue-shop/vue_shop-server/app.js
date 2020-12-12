const express =require ('express')
const comexpression =require ('compression')

const app=express()
app.use(comexpression())

app.use(express.static('./dist'))
app.listen(80,()=>{
    console.log('server running at http://127.0.0.1')
})