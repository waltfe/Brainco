namespace Brainco {


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

    /**
    * Low:Attention greater than 25,High:Attention greater or equal than 75.
    */
    //% block="Attention %level" blockId="GetAttentionValue"
    export function get_Attention_Value(level: value_level): boolean {
        let value = 0
        serial.setRxBufferSize(1)
        value = serial.readBuffer(1)[0]
        switch (level) {
            case value_level.low:
                return value < 25
            case value_level.high:
                return value >= 75
            default:
                return false
        }
    }
}
