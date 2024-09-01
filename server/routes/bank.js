import db from "../countrolers/db.js";
import { Router } from "express";
const router = Router()


router.get('/accounts', async (req, res) => {
    let bank_nickname = await db.manyOrNone('select bank_nickname  from public."Bank-info" ')
let bank = []
 for(bank_nickname of bank_nickname){
    bank.push(bank_nickname.bank_nickname)
    
}

    res.json(bank)
})   

 

router.get('/bank', async (req , res)=>{
    let bank = await db.manyOrNone('select * from public."Bank-info" where bank_nickname = $1 ', req.query.id)
    console.log(bank)
    res.send(bank)
})
 

 

 





export default router