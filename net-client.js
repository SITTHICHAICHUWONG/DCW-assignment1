var net = require('net')

var HOST = '127.0.0.1'
var PORT = 6969

var db = { TIGER, FISH, BIRD, MONKY, GIRAFFE, ELEPHENT, BEAR, SNAKE }

var client = new net.Socket()
client.connect(PORT, HOST, function(){
    var i = Math.floor(Math.random() * 8);
    console.log('CONNECTED TO: ' + HOST + ':' + PORT)
    client.write(db[i])
})

client.on('data', function(data){
    console.log('DATA: ' + data)
    client.destroy()
})

client.on('close', function(){
    console.log('Connection closed')
})