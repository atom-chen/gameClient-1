/**
 * Created by egret on 15-1-7.
 */
var TaskController = (function (_super) {
    __extends(TaskController, _super);
    function TaskController() {
        _super.call(this);
        this.taskView = new TaskView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Task, this.taskView);
        this.dailyView = new DailyView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Daily, this.dailyView);
    }
    var d = __define,c=TaskController,p=c.prototype;
    return TaskController;
}(BaseController));
egret.registerClass(TaskController,'TaskController');
//# sourceMappingURL=TaskController.js.map