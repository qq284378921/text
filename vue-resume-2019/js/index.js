Vue.component('editable-span',{
  props:['value'],
  template:`
  <span>
    <span v-show="!editing">{{value}}</span>
    <input v-show="editing" type="text">
    <button @click="editing = !editing">edit</button>
  </span>
  `,
  data(){
    return {
      editing:false
    }
  }
})
var editing = false
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
        phoneNumber:'13018750384',
      },
      todoList:[
        {
          name: "睡觉",
          time: "11点"
        },
        {
          name: "洗澡",
          time: "10点"
        },
        {
          name: "吃饭",
          time: "7点"
        },
      ]
    },
    methods: {
      add(){
        this.$on('sleep', function(data){console.log(data)})
        this.$emit('sleep', "该睡觉了")
      },
      addOne() {
        this.todoList.push({
          name: "吃饭",
          time: "7点"
        },)
      },
      subtractOne() {
        this.todoList.shift()
      },
    }
})
