/**
 * Created by egret on 15-1-7.
 */
var BaseTaskView = (function (_super) {
    __extends(BaseTaskView, _super);
    function BaseTaskView(controller, parent) {
        _super.call(this, controller, parent);
        this.dataProvider = new eui.ArrayCollection();
    }
    var d = __define,c=BaseTaskView,p=c.prototype;
    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        //布局
        var layout = new eui.VerticalLayout();
        layout.horizontalAlign = "center";
        //创建一个列表
        this.taskList = new eui.List();
        this.taskList.itemRenderer = TaskItemRenderer;
        this.taskList.itemRendererSkinName = "resource/skins/TaskItemRendererSkin.exml";
        this.taskList.dataProvider = this.dataProvider;
        this.taskList.layout = layout;
        //创建一个 Scroller
        this.scroller = new eui.Scroller();
        this.scroller.percentWidth = this.scroller.percentHeight = 100;
        this.scroller.top = 5;
        this.scroller.viewport = this.taskList;
        this.contentGroup.addChild(this.scroller);
    };
    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    p.initData = function () {
        _super.prototype.initData.call(this);
    };
    return BaseTaskView;
}(BasePanelView));
egret.registerClass(BaseTaskView,'BaseTaskView');
//# sourceMappingURL=BaseTaskView.js.map