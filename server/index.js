import express from "express";
import bankRout from "./routes/bank.js"
import checksRout from "./routes/checks.js"
import cors from "cors";
import {fileURLToPath} from "url"
import { dirname , join } from "path";  
import db from "./countrolers/db.js"; 
import https from 'https';
import fs from 'fs';
const port = 80

const app = express() 

const options = {
    key: fs.readFileSync('path/to/private.key'),
    cert: fs.readFileSync('path/to/certificate.crt')
  };


app.use(express.json());
app.use(cors())
app.use('',bankRout)
app.use('',checksRout)
  

const __dirname = dirname(fileURLToPath(import.meta.url)); 
app.use(express.static(join(__dirname, '..\\client')));


app.get('/check' ,  (req, res)=>{res.sendFile(join(__dirname ,'..\\client\\pdf.html'))})
app.post('/bank', async (req , res)=>{
 const   bankName = req.body.bankName 
const  bankNickname = req.body.bankNickname
const  name = req.body.name
const  accountNumber = req.body.accountNumber
 const routingNumber = req.body.routingNumber
     
    try{
        console.log(req.body)
 await db.none(`insert into public."Bank-info" (account_number , routing_number , "name" , bank_name , bank_nickname) values ( '${accountNumber}', '${routingNumber}' ,'${name}' , '${bankName}' ,'${bankNickname}')`)
 }catch{}
    res.send('ok')
     
}) 

  
 




https.createServer(options, app).listen(port, () => {
    console.log(`HTTPS server running on port ${port}`);
  });