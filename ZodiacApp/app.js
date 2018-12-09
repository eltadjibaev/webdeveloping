const express = require('express');
const app = express();

app.use(express.static(__dirname+'/client'));

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('The server has started!!');    
});