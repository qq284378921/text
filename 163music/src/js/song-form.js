{
    let view = {
        el: '.page > main',
        template: `
        <h1>新建歌单</h1>
            <form  class="form" id="myForm">
                <div class="row">
                    <label>
                        歌名
                    </label>
                    <input id="songName" type="text">
                </div>
                <div class="row">
                    <label>
                        歌手
                    </label>
                    <input id="singer" type="text">
                </div>
                <div class="row">
                    <label>
                        外链
                    </label>
                    <input id="url" type="text">
                </div>
                <div class="row actions">
                    <button onclick="uploading(event)" type="submit" >提交</button>
                </div>
            </form>
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model = {}
    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
        }
    }
    controller.init(view, model)
}
function uploading(e) {
    e.preventDefault();
    var songName = $('#songName').val();
    var singer = $('#singer').val();
    var url = $('#url').val();
    if (!songName) { alert('请输入歌名'); return; }
    if (!singer) { alert('请输入歌手'); return; }
    if (!url) { alert('请输入外链'); return; }

    var TestObject = AV.Object.extend('Song');
    var testObject = new TestObject();
    testObject.save({
        songName: songName,
        singer: singer,
        url: url
    }).then(function (object) {
        alert('上传成功');
    })
}