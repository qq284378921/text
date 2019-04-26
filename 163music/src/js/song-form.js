function uploading(e) {
    e.preventDefault();
    let songName = $('#songName').val();
    let singer = $('#singer').val();
    let url = $('#url').val();
    let songId = $('.songList > .active').attr('data-song-id');
    if (!songName) { alert('请输入歌名'); return; }
    if (!singer) { alert('请输入歌手'); return; }
    if (!url) { alert('请输入外链'); return; }

    if (songId) {
        var todo = AV.Object.createWithoutData('Song', songId);
        // 修改属性
        console.log(songId)
        todo.set('songName', $('#songName').val());
        todo.set('singer', $('#singer').val());
        todo.set('url', $('#url').val());
        // 保存到云端
        todo.save().then(()=>{
            alert('修改成功');
            location.reload();
        });
    } else {
        var TestObject = AV.Object.extend('Song');
        var testObject = new TestObject();
        testObject.save({
            songName: songName,
            singer: singer,
            url: url
        }).then(function () {
            window.eventHub.emit('uploaded');//上传成功事件
            alert('上传成功');
            location.reload();
        })
    }


}
// function updata(data) {
//     var todo = AV.Object.createWithoutData('Song', songID);
//     // 修改属性
//     todo.set('songName',$('#songName').val());
//     todo.set('singer', $('#singer').val());
//     todo.set('url', $('#url').val());
//     // 保存到云端
//     todo.save();
// }
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
                        外链
                    </label>
                    <input id="url" type="text" value="__url__">
                </div>
                <div class="row actions">
                    <button onclick="uploading(event)" type="button">__button__</button>
                </div>
            </form>
        `,
        render(data) {
            let songsKeyWords = ['songName', 'singer', 'url']
            let html = this.template
            songsKeyWords.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
                // console.log(data)
                // console.log(html)
                // console.log(songsKeyWords)
            })
            html = html.replace(`__button__`, data['url'] ? '保存' : '上传')
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
            songName: '', singer: '', url: '',
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
                this.model.data = { songName: '', singer: '', url: '' }
                this.view.render(this.model.data)
            })
        }
    }
    controller.init(view, model)
}
