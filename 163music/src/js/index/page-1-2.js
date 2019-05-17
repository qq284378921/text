{
  let view = {
    el: '.newMusic',
    template: `
      <li>
      <h3>__songName__</h3>
      <p>
        <svg class="icon icon-sq">
          <use xmlns: xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-sq"></use>
            </svg>
            __singer__
          </p >
      <a class="playButton" href="./play-page.html?id=__id__">
      <svg class="icon icon-play">
        <use xmlns: xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
            </svg>
          </a>
        </li>
    `,
    init() {
      this.$el = $(this.el)
    },
    render(data) {
      let { songs } = data
      songs.map((song) => {
        let songsKeyWords = ['songName', 'id', 'singer']
        let li = this.template
        songsKeyWords.map((string) => {
          li = li.replace(`__${string}__`, song[string])
        })
        this.$el.find('ol').append(li)
      })
    }
  }
  let model = {
    data: {
      songs: []
    },
    find() {
      var query = new AV.Query('Song');
      return query.find().then((songs) => {
        this.data.songs = songs.map((song) => {
          return {picture: song.attributes.picture, singer: song.attributes.singer, songName: song.attributes.songName, url: song.attributes.url, id: song.id}
        })
        return songs
      })
    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.model.find().then(() => {
        this.view.render(this.model.data)
      })
    }
  }
  controller.init(view, model)
}