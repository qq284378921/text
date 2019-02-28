// 真正返回 response 之前使用
axios.interceptors.response.use(function (response){
    response.date = {
        'name': 'jimmy' 
    }
    return response
})

axios.get('/axiosExercise/books/1').then((response)=>{
    console.log(response)
})

let test = {
    test1: 'a',
    test2: 'b'
}
// 此处的Object.assign会依次把test1:'c', test3:'d'赋值到test当中去
Object.assign(test,{test1: 'c'},{test3: 'd'})

$('#increase').on('click',function(){
    $('#number').text($('#number').text()- 0 + 1)
})
$('#reduce').on('click',function(){
    $('#number').text($('#number').text()- 0 - 1)
})
$('#empty').on('click',function(){
    $('#number').text(0)
})