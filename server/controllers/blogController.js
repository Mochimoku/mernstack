// ติดต่อกับฐานข้อมูล / ดำเนินการกับฐานข้อมูล

const slugify = require("slugify");
const Blogs = require("../models/blogs");
const blogs = require("../models/blogs");

const { v4: uuidv4 } = require('uuid');

/*
    const data = "mern stact"
    const slug = slugify(data);
    o/p = "mern-stact"
*/
//บันทึกข้อมูล
exports.create =(req,res)=>{
    const {title,content,author} = req.body;
    // slugify แทนที่ช่องว่างด้วย '-'
    let slug = slugify(title);

    // ถ้า slug เป็นค่าว่าง ให้สร้าง uuid ให้ slug โดย slug จะเป็นค่าก็ต่อเมื่อ slug เป็นภาษาไทย
    if(!slug) slug=uuidv4();
    // validate /ตรวจสอบความถูกต้องของข้อมูล
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหาบทความ"})
            break;
        
    }
    // บันทึกข้อมูล
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:"มีชื่อบทความซ้ำกัน"})
        }
        res.json(blog)
    })

    


   /* res.json({
        data:{title,content,author,slug}
    })*/
}

// ดึงข้อมูลบทความทั้งหมด
exports.getAllblogs=(req,res)=>{
    Blogs.find({}).exec((err,blogs)=>{
        res.json(blogs)
    })
}

// ดึงบทความที่สนใจ Ref: slug
exports.singleBlog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}

// ลบบทความ
exports.remove=(req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json({
            message:"ลบบทความเรียบร้อย"
        })
    })
}

// อัพเดรตบทความ
exports.update=(req,res)=>{
    const {slug} = req.params
    //ส่งข้อมูล => title , content , author
    const {title,content,author} = req.body;
    // ค้นบทความและอัพเดรต
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json(blog)
    })
}