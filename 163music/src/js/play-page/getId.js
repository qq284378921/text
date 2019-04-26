// 获取song.id
let search = window.location.search
if (search.indexOf('?') === 0) {
  search = search.substring(1)
}
// 去重，避免url中含有两个&造成数组中有空值
let array = search.split('&').filter(e => e)
let id = ''
for (let i = 0; i < array.length; i++) {
  let kv = array[i].split('=')
  let key = kv[0]
  let val = kv[1]
  if (key === 'id') {
    id = val
    break
  }
}
// console.log(id)

//根据song.id获取相关信息
var query = new AV.Query('Song');
query.get(id).then(function (song) {
  // 成功获得实例
  let songInfo = song.attributes
  console.log(songInfo)
  $('body').append(`<audio src="${songInfo.url}" id="myaudio" hidden="true"></audio>`)
  $('#songTitle').text(songInfo.songName + ' - ' + songInfo.singer)
  // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
  
  return musicUrl
}, function (error) {
  alert('该歌链接挂啦！！！请稍后重试')
  // 异常处理
});
function controlMusic() {
  let player = document.getElementById('myaudio')
  if (player.paused) {
    player.play()
    $('.icon-button').attr('hidden',true)
    $('.light').removeClass('offRotation')
    $('.cover').removeClass('offRotation')
  } else {
    player.pause()
    $('.icon-button').attr('hidden',false)
    $('.light').addClass('offRotation')
    $('.cover').addClass('offRotation')
  }
}


