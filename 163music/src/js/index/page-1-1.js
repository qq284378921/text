getInfo()

function getInfo() {
  var query = new AV.Query('PlayList');
  query.find().then((song) => {
    let i = 0
    song.map((song,i) => {
      let info = {picture: song.attributes.picture, intro: song.attributes.intro, PlayListName: song.attributes.PlayListName}
      insertInfo(info,i)
      i=i+1
    })
  })
}
function insertInfo(event,e) {
  $(".playList > div > img")[e].src = event.picture
  $(".playList > p")[e].innerText = event.PlayListName

}
