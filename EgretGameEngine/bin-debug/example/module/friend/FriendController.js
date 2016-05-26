/**
 * Created by egret on 15-1-7.
 */
var FriendController = (function (_super) {
    __extends(FriendController, _super);
    function FriendController() {
        _super.call(this);
        this.friendView = new FriendView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Friend, this.friendView);
    }
    var d = __define,c=FriendController,p=c.prototype;
    return FriendController;
}(BaseController));
egret.registerClass(FriendController,'FriendController');
//# sourceMappingURL=FriendController.js.map