/**
 * Created by egret on 15-1-7.
 */
var FactoryController = (function (_super) {
    __extends(FactoryController, _super);
    function FactoryController() {
        _super.call(this);
        this.factoryView = new FactoryView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Factory, this.factoryView);
    }
    var d = __define,c=FactoryController,p=c.prototype;
    return FactoryController;
}(BaseController));
egret.registerClass(FactoryController,'FactoryController');
//# sourceMappingURL=FactoryController.js.map