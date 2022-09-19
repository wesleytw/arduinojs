const Server = require('socket.io')
const five = require('johnny-five');
let io
const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    io = new Server(res.socket.server)
    res.socket.server.io = io

    // io.on('connection', socket => {
    //   socket.on('input-change', msg => {
    //     socket.broadcast.emit('update-input', msg)
    //   })
    // })
  }
  if (res.socket.server.io) {
    const board = new five.Board({ port: "/dev/tty.usbserial-110" });
    // johnny-five event when johnny init ready
    board.on('ready', function () {
      // 指定LED output 為 Arduino 第13腳
      const led = new five.Led(13);
      // led 初始化狀態
      led.off();
      // socket連線成功時，開始偵聽前端的 swEvent 事件
      io.on('connection', function (socket) {
        socket.on('input-change', function (data) {
          //如果前端有動作則呼叫 johnny-five led.toggle() 切換led狀態
          console.log(data);
          if (data != false) {
            led.toggle();
          }
        });
      });
    });
  }
  res.end()
}

export default SocketHandler


// https://ithelp.ithome.com.tw/articles/10221822