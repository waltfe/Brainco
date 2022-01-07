function getAttentionValue () {
    buffer = buffer.concat(serial.readBuffer(6))
if (buffer.length > 0) {
        for (let i = 0; i <= buffer.length - 1; i++) {
            if (buffer[i] == 170) {
                buffer = buffer.slice(i);
break;
            }
        }
    }
    if (buffer.length > 6 && buffer[0] == 170 && buffer[1] == 0 && buffer[2] == 0 && buffer[3] == 0 && buffer[5] == 85) {
        value = buffer[4]
        buffer = buffer.slice(6)
    }
    return value
}
let value = 0
let buffer: Buffer = null
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)
serial.setTxBufferSize(6)
buffer = serial.readBuffer(6)
basic.forever(function () {
    if (getAttentionValue() > 40) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.showIcon(IconNames.SmallHeart)
    }
})
