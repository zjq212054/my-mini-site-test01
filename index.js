// ESM 模組
// import express from "express";
// import {resolve} from "path";
// // 引入 JSON 丟給 jsonData
// import jsonData from "./singers.json" assert { type: "json" };

//const {singers} = jsonData; // singers 陣列

const express = require("express");
const path = require("path");
const jsonData = require("./singers.json");
const {singers} = jsonData;

// console.log(singers);

const app = express();

app.get('/',(req,res)=>{
    res.send('網站首頁!');
})

//在這個範例中，將會透過 http://localhost:3000/signer/3.html 這樣的方式去對應 JSON id 為 3 的資料，把資料中的名字與圖片取出來顯示在頁面中

app.get('/singer/:id.html',(req,res)=>{
    const {id} = req.params;

    let result = singers.find(singer => singer.id === parseInt(id)); //以上簡寫
    // res.json(result)

    if(result){
        res.status(200).send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${result.singer_name} Page</title>
        </head>
        <body>
            <h1>${result.singer_name}</h1>
            <img src="${result.singer_img}" alt="">
        </body>
        </html>`)
    }else{
        res.status(404).set("ZJQ","Server").send('<h1>查無資料</h1>');
    }
});

// api json 用法 api.singer/:id -> api.singer/4
app.get('/api.singer/:id',(req,res)=>{
    const {id} = req.params;

    let result = singers.find(singer => singer.id === parseInt(id)); //以上簡寫
    // res.json(result)

    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).json({error:"查無資料"});
    }
});

//路由規則redirect , download , content
app.get("/netflix", (req, res)=>{
    res.redirect("https://www.netflix.com/tw/"); //redirect 直接放網址
});

// import.meta.dirname 為當前檔案的路徑
app.get("/download", (req, res)=>{
    res.download(path.resolve(__dirname,"singers.json")); //download 下載
})

app.get("/content", (req, res)=>{
    res.sendFile(path.resolve("test.html")); //sendFile 顯示檔案內容
})

app.listen(3000,()=>{
    console.log('伺服器已啟動於 http://localhost:3000');
});