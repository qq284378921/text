let id
let player = document.getElementById('myaudio')
let lyricList = {}
getSongId()
getSongInfo()
window.onload = watch

// 获取song.id
function getSongId() {
  let search = window.location.search
  if (search.indexOf('?') === 0) {
    search = search.substring(1)
  }
  // 去重，避免url中含有两个&造成数组中有空值
  let array = search.split('&').filter(e => e)
  for (let i = 0; i < array.length; i++) {
    let kv = array[i].split('=')
    let key = kv[0]
    let val = kv[1]
    if (key === 'id') {
      id = val
      break
    }
  }
}
//根据song.id获取相关信息
function getSongInfo() {
  let query = new AV.Query('Song')
  query.get(id).then(function (song) {
    // 成功获得实例
    let songInfo = song.attributes
    player.src = songInfo.url //更改src的url
    $('#backgroundBox').css('background-image',"url(" + songInfo.picture + ")") //背景图
    $('#songPicture').attr('src',songInfo.picture) //光盘图
    $('#songTitle').text(songInfo.songName + ' - ' + songInfo.singer) //标题
    disposeLyric(songInfo) //歌词处理
    // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
  }, function (error) {
    alert('该歌链接挂啦！！！请稍后重试')
    // 异常处理
  })
}

// 根据播放情况控制光盘动作
function controlMusic() {
  if (player.paused) {
    player.play()
    $('.icon-button').attr('hidden', true)
    $('.light').removeClass('offRotation')
    $('.cover').removeClass('offRotation')

  } else {
    player.pause()
    $('.icon-button').attr('hidden', false)
    $('.light').addClass('offRotation')
    $('.cover').addClass('offRotation')
  }
}
// 音乐结束停止所有动作
function musicEnded() {
  $('.icon-button').attr('hidden', false)
  $('.light').addClass('offRotation')
  $('.cover').addClass('offRotation')
  $(".moveLyric").css('transform',"translateY(-0px)")
}
// 建立歌词的html
function disposeLyric(event) {
  let lyric = event.lyric.split('\n').filter(e => e)
  lyric.forEach((val) => {
    let min = val.substr(1, 2) * 60 * 1000 // 分转毫秒
    let second = val.substr(4, 5) * 1000 // 秒转毫秒
    let time = min + second
    lyricList[time] = val.substr(10)
  })
  let lyricHtml = ''
  for (let i in lyricList) {
    let lyricP = '<p data-time="' + i + '">' + lyricList[i] + '</p>'
    lyricHtml += lyricP
  }
  let lyricBox = document.getElementById('lyricBox')
  lyricBox.innerHTML = lyricHtml
}

// 歌曲播放时间处理
function getPlayingTime() {
  return Math.round((document.getElementById('myaudio').currentTime) * 1000)
}

//  播放时间监控 
// 歌词滚动并高亮
function watch() {
  player.ontimeupdate = () => {
    let playingTime = getPlayingTime()
    for (let lyricTime in lyricList) {
      if (playingTime + 200 > lyricTime && playingTime - 200 < lyricTime) {
        $(".moveLyric > p").removeClass('light')
        $(".moveLyric > p[data-time='" + lyricTime + "']").addClass('light ')
        let y = $(".moveLyric > p[data-time='" + lyricTime + "']").position().top - 24.8
        $(".moveLyric").css('transform',"translateY(-"+ y +"px)")
      }
    }

  }
}