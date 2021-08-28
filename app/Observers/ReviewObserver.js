const Cache = require("../../config/cache");

class ReviewObserver
{
    /**
     * Handle the systems "created" event.
     *
     * @param  
     * @return void
     */
    created () 
    {
        Cache.del('reviews')
    }
    /**
     * Handle the systems "updated" event.
     *
     * @param  
     * @return void
     */
    updated () 
    {
        Cache.del('reviews')
    }
    /**
     * Handle the systems "deleted" event.
     *
     * @param  
     * @return void
     */
    deleted () 
    {
        Cache.del('reviews')
    }
}

module.exports = new ReviewObserver;