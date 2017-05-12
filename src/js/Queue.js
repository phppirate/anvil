export default class Queue {
    constructor(){
        this.jobs = {}
    }
    count(){
        return Object.keys(this.jobs).length
    }

    push(job, uniqueId = null){
        let jobId = uniqueId ? uniqueId : (Math.floor(Math.random() * (999999 - 100000)) + 100000)
        this.jobs[jobId] = job
        let timer = setInterval(() => {
            console.log('TRIED');
            fetch(job.url, { method: job.method }).then(r => r[job.convertsTo]()).then(r => {
                console.log(r);
                if(job.compare(r)){
                    clearInterval(timer);
                    job.callback();
                    delete this.jobs[jobId]
                    console.log('DONE TRYING');
                }
            });
        }, job.interval);
    }
}