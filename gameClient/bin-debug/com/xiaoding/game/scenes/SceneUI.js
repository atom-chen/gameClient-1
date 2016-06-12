/**
 * Created by xiaoding on 2016/6/8.
 */
var SceneUI = (function (_super) {
    __extends(SceneUI, _super);
    function SceneUI() {
        _super.call(this);
    }
    var d = __define,c=SceneUI,p=c.prototype;
    p.onEnter = function () {
        _super.prototype.onEnter.call(this);
        //添加该Scene使用的层级
        this.addLayer(LayerManager.UI_Main);
        this.addLayer(LayerManager.UI_Popup);
        this.addLayer(LayerManager.UI_Message);
        this.addLayer(LayerManager.UI_Tips);
        var rect = new eui.Rect();
        rect.fillColor = 0x78b93f;
        rect.percentHeight = 100;
        rect.percentWidth = 100;
        LayerManager.UI_Main.addChild(rect);
        //打开主页
        App.ViewManager.open(ViewConstants.Home);
    };
    return SceneUI;
}(BaseScene));
egret.registerClass(SceneUI,'SceneUI');
//# sourceMappingURL=SceneUI.js.map