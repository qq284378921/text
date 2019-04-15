window.eventHub = {
    events: {
        '羊城晚报': [],
        '深圳晚报': []
    },
    emit(){

    },
    on(eventName, fn){
        for(let key in this.events){
            if(key === eventName){
                this.events[key].push(fn)
            }
        }
    },
    off(){

    },
}