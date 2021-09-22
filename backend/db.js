const mongoose=require('mongoose');
const url='mongodb://localhost:27017/notesdata'

const connecttomongo=()=>{
mongoose.connect(url);
}

module.exports=connecttomongo;