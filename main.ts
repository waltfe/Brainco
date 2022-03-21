//%color=#921AFF icon="\uf118" block="Brainco" blockId="Brainco"
namespace Brainco{


    export enum value_level{
        /**
         * Attention greater than 35
         */
        //% block="low"
        low = 35,
        /**
         * Attention greater than 50
         */
        //% block="middle"
        middle = 50,
        /**
         * Attention greater than 65
         */
        //% block="high"
        high = 65
    }

    //%block="init Brainco"
    export function initBrainco() {
        serial.redirectToUSB()
        serial.setBaudRate(BaudRate.BaudRate115200)
    }
    
    /**
    * Low:Attention greater than 35,Middle:Attention greater than 50,High:Attention greater than 65.
    */
    //% block="Attention %level" blockId="GetAttentionValue"
    export function get_Attention_Value(level:value_level):boolean {
        let value = 0
        let buffer: Buffer = null
        buffer = serial.readBuffer(6)
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
        switch (level) {
            case value_level.low:
                if (value > value_level.low)
                    return true
                else
                    return false
            case value_level.middle:
                if (value > value_level.middle)
                    return true
                else
                    return false
            case value_level.high:
                if (value > value_level.high)
                    return true
                else
                    return false
            default:
                return false
        }
    }
}

