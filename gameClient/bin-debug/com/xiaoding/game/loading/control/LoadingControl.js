/**
 * Created by xiaoding on 2016/6/8.
 */
var LoadingControl = (function (_super) {
    __extends(LoadingControl, _super);
    function LoadingControl() {
        _super.call(this);
        //一般在控制模块里注册视图
        this.loadingView = new LoadingView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConstants.Loading, this.loadingView);
        //跨模块调用前必须先注册事件监听
        this.registerFunc(LoadingConstants.SetProgress, this.setProgress, this);
    }
    var d = __define,c=LoadingControl,p=c.prototype;
    p.setProgress = function (current, total) {
        this.loadingView.setProgress(current, total);
    };
    return LoadingControl;
}(BaseController));
egret.registerClass(LoadingControl,'LoadingControl');
//# sourceMappingURL=LoadingControl.js.map