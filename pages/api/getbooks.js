import Book from "../../models/Book";
import connectDb from "../../middleware/mongoose";


const handler = async (req,res)=>{

    let books  = await Book.find()
    let phones={}
    for(let item of books){
        if(item.title in phones){
            if( item.availableQty>0){
                phones[item.title].color.push(item.color)   
            }
        }
        else{
            phones[item.title] = JSON.parse(JSON.stringify(item))
            if(item.availableQty>0){   
                phones[item.title].color = [item.color]
            }
        }
    }
    res.status(200).json({ phones });
}
export default connectDb(handler)
