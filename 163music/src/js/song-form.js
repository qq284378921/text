// 上传or修改
function uploading() {
    let songName = $('#songName').val()
    let singer = $('#singer').val()
    let url = $('#url').val()
    let lyric = $('#lyric').val()
    let picture = $('#picture').val()
    let songId = $('.songList > .active').attr('data-song-id')
    if (!songName) { alert('请输入歌名'); return; }
    if (!singer) { alert('请输入歌手'); return; }
    if (!url) { alert('请输入歌曲外链'); return; }
    if (!lyric) { alert('请输入歌词'); return; }
    if (!picture) { alert('请输入图片地址'); return; }

    if (songId) {
        var todo = AV.Object.createWithoutData('Song', songId);
        // 修改属性
        todo.set('songName', $('#songName').val())
        todo.set('singer', $('#singer').val())
        todo.set('url', $('#url').val())
        todo.set('lyric', $('#lyric').val())
        todo.set('picture', $('#picture').val())
        // 保存到云端
        todo.save().then(() => {
            alert('修改成功')
            location.reload()
        });
    } else {
        var TestObject = AV.Object.extend('Song');
        var testObject = new TestObject();
        testObject.save({
            songName: songName,
            singer: singer,
            url: url,
            lyric: lyric,
            picture: picture,
        }).then(function () {
            window.eventHub.emit('uploaded');//上传成功事件
            alert('上传成功')
            location.reload()
        })
    }


}
// 清空或删除
function deleteClear() {
    let songId = $('.songList > .active').attr('data-song-id')
    if (songId) {
        var todo = AV.Object.createWithoutData('Song', songId);
        todo.destroy().then(function (success) {
            alert('删除成功')
        }, function (error) {
            // 删除失败
        });
    } else {
        $('#songName').val('')
        $('#singer').val('')
        $('#url').val('')
        $('#lyric').val('')
        $('#picture').val('')
    }

}
// 主题结构mvc
{
    let view = {
        el: '.page > main',
        template: `
            <form  class="form" id="myForm">
                <div class="row">
                    <label>
                        歌名
                    </label>
                    <input id="songName" type="text" value="__songName__">
                </div>
                <div class="row">
                    <label>
                        歌手
                    </label>
                    <input id="singer" type="text" value="__singer__">
                </div>
                <div class="row">
                    <label>
                        歌曲外链
                    </label>
                    <input id="url" type="text" value="__url__">
                </div>
                <div class="row">
                    <label>
                        图片外链
                    </label>
                    <input id="picture" type="text" value="__picture__">
                </div>
                <div class="row">
                    <label>
                        歌词
                    </label>
                    <textarea id="lyric" rows="8" cols="40">__lyric__</textarea>
                </div>
                <div class="row actions">
                    <button onclick="uploading(event)" type="button">__button__</button>
                    <button onclick="deleteClear()" type="button">__delete__</button>
                </div>
            </form>
        `,
        render(data) {
            let songsKeyWords = ['songName', 'singer', 'url', 'lyric', 'picture']
            let html = this.template
            songsKeyWords.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
                // console.log(data)
                // console.log(html)
                // console.log(songsKeyWords)
            })
            html = html.replace(`__button__`, data['url'] ? '保存' : '上传')
            html = html.replace(`__delete__`, data['url'] ? '删除' : '清空')
            $(this.el).html(html)
            if (data.id) {
                $(this.el).prepend('<h1>编辑歌曲</h1>')
            } else {
                $(this.el).prepend('<h1>新建歌曲</h1>')
            }

        }

    }
    let model = {
        data: {
            songName: '', singer: '', url: '', lyric: '', picture: ''
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            window.eventHub.on('upload', (data) => {
                this.model.data = data
                this.view.render(this.model.data)
            })
            window.eventHub.on('select', (data) => {
                this.model.data = data
                // console.log(this.model.data)
                this.view.render(this.model.data)
            })
            window.eventHub.on('new', () => {
                this.model.data = { songName: '', singer: '', url: '', lyric: '', picture: '' }
                this.view.render(this.model.data)
            })
        }
    }
    controller.init(view, model)
}
