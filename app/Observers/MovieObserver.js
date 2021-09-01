const Cache = require("../../config/cache");

class MovieObserver
{
    /**
     * Handle the systems "created" event.
     *
     * @param  
     * @return void
     */
    created () 
    {
        Cache.del('movies')
    }
    /**
     * Handle the systems "updated" event.
     *
     * @param  
     * @return void
     */
    updated () 
    {
        Cache.del('movies')
    }
    /**
     * Handle the systems "deleted" event.
     *
     * @param  
     * @return void
     */
    deleted () 
    {
        Cache.del('movies')

        Cache.del('reviews')
    }
}

module.exports = new MovieObserver;