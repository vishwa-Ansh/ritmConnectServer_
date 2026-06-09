import app from './appStart.js';
import mongooseConnection from './config/mongooseConnection.js'
mongooseConnection();
function serverListen(){
    const port = Number(process.env.PORT) || 4000;
    app.listen(port,()=>{
        console.log(`server running on port ${port}`)
    });
}
serverListen();