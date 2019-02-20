var result = `/* 亲爱的面试官，你好
 * 我将以动画的形式来介绍自己
 * 只有文字介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
*/
*{
  transition: all 1s;  
}
html{
    background: rgb(222,222,222);
    font-size: 16px;
}
#code{
    border: 1px solid red;
    padding: 16px;
}
/* 接下来我要进行高亮处理 */
.token.selctor{
    color: #690;
}
.token.property{
    color: #905;
}
.token.function{
    color: #DD4A68;
}
/* 好了，不玩了，开始自我介绍啦！ */`
var n = 0
var id = setInterval(()=>{
    n += 1
    code.innerHTML = result.slice(0, n)
    code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css)
    styleTag.innerHTML = result.slice(0,n)
    if(n >= result.length){
        window.clearInterval(id)
        fn2()
        fn3(result)
    }

},10)
function fn2(){
    var paper = document.createElement('div')
    paper.id = 'papaer'
    document.body.appendChild(paper)
}
function fn3(preResult){
    var result = `
    #paper{
        width: 100px;
        height: 100px;
        background: yellow;
    }`
    var n = 0
    var id = setInterval(()=>{
        n += 1
        code.innerHTML = preResult+ result.slice(0,n)
        code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css)
        styleTag.innerHTML = preResult + result.slice(0,n)
        if(n >= result.length){
            window.clearInterval(id)
        }
    },10)
}