/**
 * Created by xiyuyizhi on 16-12-23.
 */


import Transport from "./transport"

const WW={
    http:function(config){
        const transport = new Transport(config)
        return transport.getPromise()
    }
}

export default WW