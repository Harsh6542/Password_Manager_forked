import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';
import {Site} from './models/Sites.js';
dotenv.config();
let connect = await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
const app = express();
app.use(cors());
app.use(express.json());
async function encrypt(password) {
    password = password.split('');
    for (let i = 0; i < password.length; i++) {
        password[i] = String.fromCharCode(password[i].charCodeAt(0) + 6);
    }
    let a = password.slice(0, 3).join('');
    let b = password.slice(-3).join('');
    let c = password.slice(3, -3).join('');
    const randomAsciiChar = ()=>{
        return String.fromCharCode(32 + Math.floor(Math.random() * 95));
    } 
    password = randomAsciiChar()+randomAsciiChar()+b+c+a+randomAsciiChar()+randomAsciiChar();
    return password;
}

function decrypt(encrypted) {
    encrypted = encrypted.slice(2, -2);
    let b = encrypted.slice(0, 3);
    let a = encrypted.slice(-3);
    let c = encrypted.slice(3, -3);
    let shifted = a.split('').concat(c.split('')).concat(b.split('')).join('');
    let original = '';
    for (let i = 0; i < shifted.length; i++) {
        original += String.fromCharCode(shifted.charCodeAt(i) - 6);
    }
    return original;
}

app.post('/decrypt', async(req, res) => {
    try{
        console.log('request recived : ' , req.body);
        if(!req.body.password) {
            return res.status(400).json({message: "Password is required"});
        }
        const decryptedPassword = decrypt(req.body.password);
        res.status(200).json({password: decryptedPassword});
    }catch(err){
        console.log('error in request : ', err); 
        return res.status(500).json({message: "Internal Server Error"});
    }
});

app.post('/', async(req, res) => {
    try{
        console.log('request recived : ' , req.body);
        req.body.password = await encrypt(req.body.password);
        const site = new Site({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });
        await site.save();
        res.status(201).send('Site saved successfully');
    }catch(err){
        console.log('error in request : ', err);
        return res.status(500).json({message: "Internal Server Error"});
    }
});

app.post('/saveChanges',async(req, res) => {
    try{
        console.log('request recived : ' , req.body);
        let site = await Site.findById(req.body._id);
        console.log('site found : ', site);
        if(!site) {
            return res.status(404).json({message: "Site not found"});
        }
        site.name = req.body.name;
        site.username = req.body.username;
        site.password = site.password==req.body.password?site.password:await encrypt(req.body.password);
        await site.save();
        res.status(201).send('Site saved successfully');
    }catch(err){
        console.log('error in request : ', err);
        return res.status(500).json({message: "Internal Server Error"});
    }
});

app.post('/delete', async(req, res) => {
    try{
        console.log('request recived : ' , req.body);
        const site = await Site.findByIdAndDelete(req.body._id);
        if(!site) {
            return res.status(404).json({message: "Site not found"});
        }
        res.status(200).json({message: "Site deleted successfully"});
    }catch(err){
        console.log('error in request : ', err);
        return res.status(500).json({message: "Internal Server Error"});
    }
});

app.get('/',async(req, res) => {
    try{
        const sites = await Site.find();
        res.status(200).json(sites);
    }catch(err){
        console.log('error in request : ', err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}   );
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
 