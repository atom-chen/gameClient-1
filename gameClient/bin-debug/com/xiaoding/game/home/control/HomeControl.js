/**
 * Created by xiaoding on 2016/6/12.
 */
var HomeControl = (function (_super) {
    __extends(HomeControl, _super);
    function HomeControl() {
        _super.call(this);
        this.homeView = new HomeView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConstants.Home, this.homeView);
    }
    var d = __define,c=HomeControl,p=c.prototype;
    return HomeControl;
}(BaseController));
egret.registerClass(HomeControl,'HomeControl');
//# sourceMappingURL=HomeControl.js.map