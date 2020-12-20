import express,{ Router } from 'express'
import  authRouter  from './Zoho.Router'

export const router : Router = express.Router() 

router.use('v1/zoho',authRouter)

