const handler = function(){
    console.log('queryAssigneeList handler');
    return function(cb){
        /* mock response [start] */
        const resp = {
            "code": 0,
            "data": [{
                "id": "1",
                "name": "Ben"
            },{
                "id": "2",
                "name": "Chris"
            },{
                "id": "3",
                "name": "Denis"
            },{
                "id": "4",
                "name": "Frank"
            },{
                "id": "5",
                "name": "Jack"
            }]
        };
        /* mock response [end] */
        cb(null, JSON.stringify(resp));
    }
}

module.exports = handler;