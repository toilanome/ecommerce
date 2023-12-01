import { connect } from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
const {PORT, DB_URL} = process.env || 8888


const DbConnect = async () =>{
    try {
        const db = await connect(DB_URL)
        if(db.connection.readyState === 1) console.log('db connect thành công');
        else console.log('connect ');
    } catch (error) {
        console.log('db connect faile');
        throw new Error(error)
    }
}
export default DbConnect