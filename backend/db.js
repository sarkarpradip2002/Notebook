const mongoose=require('mongoose');
const url='mongodb+srv://1234:1234@cluster0.6cq1m.mongodb.net/Notes?retryWrites=true&w=majority'

const connecttomongo=()=>{
mongoose.connect(url);
}

module.exports=connecttomongo;