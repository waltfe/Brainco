namespace Brainco {

    let attentionCollectFalg: boolean = false
    let attentionCollectTime: number = 0
    let attentionValue: number = -1
    export enum value_level {
        /**
         * Attention smaller than 25
         */
        //% block="low"
        low = 1,

        /**
         * Attention greater than 75
         */
        //% block="high"
        high = 2
    }

    function attentionValueCollect() {
        serial.setRxBufferSize(1)
        let buffer = serial.readBuffer(1)
        if (buffer != null && buffer != undefined && buffer.length > 0) {
            attentionValue = buffer[0]
            attentionCollectTime = input.runningTime()
        }
    }

    /**
    * Low:Attention greater than 25,High:Attention greater or equal than 75.
    */
    //% block="Attention %level" blockId="GetAttentionValue"
    export function get_Attention_Value(level: value_level): boolean {
        if (!attentionCollectFalg) {
            attentionCollectFalg = true
            basic.forever(() => {
                attentionValueCollect()
                basic.pause(50)
            })
            attentionValueCollect()
        }

        if(attentionValue < 0 || attentionCollectTime + 2000 < input.runningTime()){
            return false
        }

        switch (level) {
            case value_level.low:
                return attentionValue < 25
            case value_level.high:
                return attentionValue >= 75
            default:
                return false
        }
    }
}
