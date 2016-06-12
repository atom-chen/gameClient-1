/**
 * Created by xiaoding on 2016/6/8.
 */
var SceneLoading = (function (_super) {
    __extends(SceneLoading, _super);
    function SceneLoading() {
        _super.call(this);
    }
    var d = __define,c=SceneLoading,p=c.prototype;
    p.onEnter = function () {
        _super.prototype.onEnter.call(this);
        //添加该Scene使用的层级
        this.addLayer(LayerManager.UI_Main);
        //初始打开Loading页面前必须先注册视图（在控制模块中）
        App.ViewManager.open(ViewConstants.Loading);
    };
    return SceneLoading;
}(BaseScene));
egret.registerClass(SceneLoading,'SceneLoading');
//# sourceMappingURL=SceneLoading.js.map