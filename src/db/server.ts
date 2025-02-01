import express from 'express';
import { pool, connectToDb } from './db/connection';

const app = express ()
const PORT = process.env.PORT || 3001 
const connectionPool = pool 

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/api/employee', (req, res) => {
    const {first_name, last_name, salary, role } = req.body 
})
app.get() 



