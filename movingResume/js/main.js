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

var result2 = `
    #paper{
        width: 100px;
        height: 100px;
        background: yellow;
    }`

function writeCode(code){
    let domCode = document.getElementById('preCode')
    let n = 0
    let id = setInterval(()=>{
        n += 1
        domCode.innerHTML = Prism.highlight(code.slice(0,n), Prism.languages.css)
        styleTag.innerHTML = code.slice(0,n)
        domCode.scrollTop = 10000;
        if(n > code.length){
            window.clearInterval(id)
        }
    },10)
}
writeCode(result)


function fn2(){
    var paper = document.createElement('div')
    paper.id = 'paper'
    document.body.appendChild(paper)
}

function fn3(preResult){
    
    var n = 0
    var id = setInterval(()=>{
        n += 1
        code.innerHTML = preResult+ result.slice(0,n)
        code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css)
        console.log(0)
        styleTag.innerHTML = preResult + result.slice(0,n)
        console.log(styleTag.innerHTML)
        if(n >= result.length){
            window.clearInterval(id)
        }
    },10)
}