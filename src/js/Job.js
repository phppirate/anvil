//  End Structure of a Job
//  {
//     url: 'path/to/thing',
//     method: "GET",
//     convertsTo: "text",
//     compare(){},
//     callback(){},
//     interval: 12000,
// }

export default class Job {
    constructor(url){
        this.url = url
        this.callback = () => true
        this.compare = () => true
        this.interval = 12000
        this.convertsTo = "text"
        this.method = "GET"
    }

    withCallback(callback){
        this.callback = callback
        return this
    }

    using(method){
        this.method = method
        return this
    }

    return(convertsTo){
        this.convertsTo = convertsTo
        return this
    }

    every(interval){
        this.interval = interval
        return this
    }

    compareWith(compare){
        this.compare = compare
        return this
    }
}