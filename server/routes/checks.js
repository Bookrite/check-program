import db from "../countrolers/db.js";
import { Router } from "express";

const router = Router()


router.post('/checks' ,async (req  , res )=>{
    console.log('got a request to add a check')
   let request = JSON.stringify(req.body)
   request = JSON.parse(request)
console.log(request) ;
try{await   db.none(`INSERT INTO public.checks ( pay_to, amount, date, check_number, bank_id)
   VALUES ( $1 , $2, NOW(), $3 , $4)`,
   [request.payTo, req.body.amount , req.body.checkNumber, req.body.bankId])
   
   res.send({"ok":true}) }catch(err){
console.error(err)
   }
 
}) 


router.get('/latest' ,async (req , res )=>{try{const checkNumber = await db.oneOrNone(`SELECT check_number
    FROM public.checks
    WHERE bank_id = $1
    ORDER BY check_number DESC 
    LIMIT 1;`,[req.query.number])

    checkNumber != null ? res.send(checkNumber) : res.send({"check_number" : 1000})

     }catch(err){console.log(err)}

})



























export default router