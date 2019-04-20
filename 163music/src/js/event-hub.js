window.eventHub = {
    events: {
      //'羊城晚报': [fn, fn2, fn3],
      //'楚天都市报': [],
    }, // hash
    emit(eventName, data){ //发布
    //     this.events[eventName][0].call(undefined, data)
    //     fn(data)
    //     if(this.events[eventName] !== undefined) {
            
    //     }

      for(let key in this.events){
        if(key === eventName){
          let fnList = this.events[key]
          fnList.map((fn)=>{
            fn.call(undefined, data)
          })
        }
      }
    },
    on(eventName, fn){ //订阅
      if(this.events[eventName] === undefined){
        this.events[eventName] = []
      }
      this.events[eventName].push(fn)
    },
  }
  function fn() {
      console.log('nifasong')
  }