import express from 'express'
const app=express()
const port=8080
app.get('/workers', function(req, res){
    var records=[];
    for(var i=0;i<3;i++)
    {
    records.push({ workers: 'Rahul Gandhi',reason:'blood sugar level',time:'25/04/56' });
    }
    res.send(records)
});
app.get('/doctors',function(req,res){
    var t=[]
    for(var i=0;i<2;i++)
    {
        t.push({doctors:'zahra mir',time:'26/46/90'})
    }
    res.send(t)
})
app.listen(8080,()=>
{
    console.log("Route created")
})
