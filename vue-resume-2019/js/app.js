var app = new Vue({
    el: '#app',
    data: {
      modelValue:"11",
      resume:{
        name:'陈德杰',
        birthday:'1994.03',
        gender: '男',
        jobTitle:"前端工程师",
        email:'qq284378921@163.com',
        phone:'13018750384',
      },
    },
    methods:{
    onEdit(key,value){
      this.resume[key] = value
   },
   onClickSave(){


    });
   }
  }
})
