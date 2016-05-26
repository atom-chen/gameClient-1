/**
 * Created by egret on 15-1-7.
 */
var WarehouseView = (function (_super) {
    __extends(WarehouseView, _super);
    function WarehouseView(controller, parent) {
        _super.call(this, controller, parent);
        this.icon = "table_warehouse";
        this.btn = "icon_sale";
    }
    var d = __define,c=WarehouseView,p=c.prototype;
    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    p.initData = function () {
        _super.prototype.initData.call(this);
        var dp1 = new eui.ArrayCollection();
        dp1.addItem({ title: "普通化肥", price: "3", time: "-5分钟", icon: "icon_fertilizer02" });
        dp1.addItem({ title: "高速化肥", price: "5", time: "-10分钟", icon: "icon_fertilizer03" });
        dp1.addItem({ title: "飞速化肥", price: "15", time: "-30分钟", icon: "icon_fertilizer04" });
        dp1.addItem({ title: "神速化肥", price: "25", time: "-60分钟", icon: "icon_fertilizer05" });
        dp1.addItem({ title: "普通化肥", price: "3", time: "-5分钟", icon: "icon_fertilizer02" });
        dp1.addItem({ title: "高速化肥", price: "5", time: "-10分钟", icon: "icon_fertilizer03" });
        dp1.addItem({ title: "飞速化肥", price: "15", time: "-30分钟", icon: "icon_fertilizer04" });
        dp1.addItem({ title: "神速化肥", price: "25", time: "-60分钟", icon: "icon_fertilizer05" });
        dp1.addItem({ title: "普通化肥", price: "3", time: "-5分钟", icon: "icon_fertilizer02" });
        dp1.addItem({ title: "高速化肥", price: "5", time: "-10分钟", icon: "icon_fertilizer03" });
        dp1.addItem({ title: "飞速化肥", price: "15", time: "-30分钟", icon: "icon_fertilizer04" });
        dp1.addItem({ title: "神速化肥", price: "25", time: "-60分钟", icon: "icon_fertilizer05" });
        var dp2 = new eui.ArrayCollection();
        dp2.addItem({ title: "神速化肥", price: "25", time: "-60分钟", icon: "icon_fertilizer05" });
        dp2.addItem({ title: "普通化肥", price: "3", time: "-5分钟", icon: "icon_fertilizer02" });
        dp2.addItem({ title: "高速化肥", price: "5", time: "-10分钟", icon: "icon_fertilizer03" });
        dp2.addItem({ title: "飞速化肥", price: "15", time: "-30分钟", icon: "icon_fertilizer04" });
        dp2.addItem({ title: "神速化肥", price: "25", time: "-60分钟", icon: "icon_fertilizer05" });
        dp2.addItem({ title: "普通化肥", price: "3", time: "-5分钟", icon: "icon_fertilizer02" });
        dp2.addItem({ title: "高速化肥", price: "5", time: "-10分钟", icon: "icon_fertilizer03" });
        dp2.addItem({ title: "飞速化肥", price: "15", time: "-30分钟", icon: "icon_fertilizer04" });
        dp2.addItem({ title: "神速化肥", price: "25", time: "-60分钟", icon: "icon_fertilizer05" });
        dp2.addItem({ title: "普通化肥", price: "3", time: "-5分钟", icon: "icon_fertilizer02" });
        dp2.addItem({ title: "高速化肥", price: "5", time: "-10分钟", icon: "icon_fertilizer03" });
        dp2.addItem({ title: "飞速化肥", price: "15", time: "-30分钟", icon: "icon_fertilizer04" });
        var tabbar = new TabBarContainer();
        tabbar.addViewStackElement("text_seed01", "text_seed02", this.createList(dp1));
        tabbar.addViewStackElement("text_fruit_01", "text_fruit_02", this.createList(dp2));
        tabbar.addViewStackElement("text_fruit_juice_01", "text_fruit_juice_02", this.createList(dp1));
        tabbar.horizontalCenter = 0;
        this.contentGroup.addChild(tabbar);
    };
    p.createList = function (dp) {
        var layout = new eui.TileLayout();
        layout.requestedColumnCount = 2;
        var taskList = new eui.List();
        taskList.layout = layout;
        taskList.itemRenderer = SaleItemRenderer;
        taskList.itemRendererSkinName = "resource/skins/SaleItemSkin.exml";
        taskList.dataProvider = dp;
        var scroller = new eui.Scroller();
        scroller.percentWidth = scroller.percentHeight = 100;
        scroller.viewport = taskList;
        return scroller;
    };
    return WarehouseView;
}(BasePanelView));
egret.registerClass(WarehouseView,'WarehouseView');
//# sourceMappingURL=WarehouseView.js.map