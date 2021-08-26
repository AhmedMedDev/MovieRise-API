const Cache = require("../../config/cache");

class SystemObserver
{
    /**
     * Handle the systems "created" event.
     *
     * @param  
     * @return void
     */
    created () 
    {
        Cache.del('systems')
    }
    /**
     * Handle the systems "updated" event.
     *
     * @param  
     * @return void
     */
    updated () 
    {
        Cache.del('systems')
    }
    /**
     * Handle the systems "deleted" event.
     *
     * @param  
     * @return void
     */
    deleted () 
    {
        Cache.del('systems')
    }
}

module.exports = new SystemObserver;