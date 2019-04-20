{
  let view = {
    el:'.page-1',
    init(){
      this.$el = $(this.el)
    },
    show(){
      this.$el.addClass('active')
    },
    hide(){
      this.$el.removeClass('active')
    }
  }
  let model = {}
  let controller = { 
    init(view, model){
      this.view = view
      this.view.init()
      this.model = model
      this.bindEventHub()
      this.loadMudule1()
      this.loadMudule2()
    },
    bindEventHub(){
      window.eventHub.on('selectTab',(tabName)=>{
        if(tabName === 'page-1'){
          this.view.show()
        }else{
          this.view.hide()
        }
      })
    },
    loadMudule1(){
      let script1 = document.createElement('script')
      script1.src = './js/index/page-1-1.js'
      document.body.appendChild(script1)
      // console.log(1)
    },
    loadMudule2(){   
      let script2 = document.createElement('script')
      script2.src = './js/index/page-1-2.js'
      document.body.appendChild(script2)
      // console.log(2)
    }
  }
  controller.init(view, model)
}