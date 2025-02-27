namespace Brainco {

    export enum AttentionLevel {
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

    let high_handler: () => void = null
    let low_handler: () => void = null
    let init_flag = false

    //% block="on attention %level" blockId="onAttentionTrigger"
    export function onAttentionTrigger(level: AttentionLevel, hander: () => void) {

        if (level == AttentionLevel.high) {
            high_handler = hander
        } else {
            low_handler = hander
        }

        if (!init_flag) {
            init_flag = true
            basic.forever(() => {
                serial.setRxBufferSize(1)
                let buf = serial.readBuffer(1)
                if (buf != null && buf.length > 0) {
                    if (buf[0] < 25) {
                        low_handler && low_handler()
                    } else if (buf[0] > 75) {
                        high_handler && high_handler()
                    }
                }
            })
        }
    }
}
