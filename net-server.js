var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;

var db = { TIGER, FISH, BIRD, MONKY, GIRAFFE, ELEPHENT, BEAR, SNAKE}

net.createServer(function (sock) {
    var state = 0 //idle
    var current_key = null
    var i
    sock.on('data', function (data) {
        switch (state) {
            case 0:
                if (data == 'Hello') {
                    sock.write('Hello')
                    state = 1 //wait for key
                }
                break
            case 1:
                current_key = data
                for (i = 0; i < db.length; i++){
                    if(db[i] == current_key){
                       sock.write("" + (db[i] + 1)) 
                    }
                }
                state = 2 //wait for number
                break
            case 2:
                if (data == 'Thank!') {
                    sock.write('Thank!')
                    sock.close()
                    state = 3 //end                    
                } else {
                    try {
                        let v = data.toUpperCase()
                        if (!db[current_key]){
                            db[current_key] = 0
                            sock.write("" + db[current_key])
                        }
                            
                        for (i = 0; i < db.length; i++) {
                            if (db[i] == v) {
                                sock.write("" + (db[i] + 1))
                            }
                        }
                       
                    } catch (e) {
                        sock.write('INVALID')
                    }
                }
                break
        }
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);