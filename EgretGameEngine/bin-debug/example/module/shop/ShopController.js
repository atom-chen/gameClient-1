/**
 * Created by egret on 15-1-7.
 */
var ShopController = (function (_super) {
    __extends(ShopController, _super);
    function ShopController() {
        _super.call(this);
        this.shopView = new ShopView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Shop, this.shopView);
    }
    var d = __define,c=ShopController,p=c.prototype;
    return ShopController;
}(BaseController));
egret.registerClass(ShopController,'ShopController');
//# sourceMappingURL=ShopController.js.map