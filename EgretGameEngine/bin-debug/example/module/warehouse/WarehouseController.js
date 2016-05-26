/**
 * Created by egret on 15-1-7.
 */
var WarehouseController = (function (_super) {
    __extends(WarehouseController, _super);
    function WarehouseController() {
        _super.call(this);
        this.warehouseView = new WarehouseView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Warehouse, this.warehouseView);
    }
    var d = __define,c=WarehouseController,p=c.prototype;
    return WarehouseController;
}(BaseController));
egret.registerClass(WarehouseController,'WarehouseController');
//# sourceMappingURL=WarehouseController.js.map