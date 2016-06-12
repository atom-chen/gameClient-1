/**
 * Created by xiaoding on 2016/6/8.
 */
var MainGameEntry = (function () {
    function MainGameEntry() {
        var groupName = "preload";
        var subGroups = ["gameEuiRes", "preload", "animations", "maps", "iconhero", "iconItem", "efts", "equips", "shenqis", "ui2", "gameLevel", "iconTask"];
        App.ResourceUtils.loadGroups(groupName, subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
    }
    var d = __define,c=MainGameEntry,p=c.prototype;
    p.onResourceLoadComplete = function () {
        this.initModule();
        App.SceneManager.runScene(SceneConstants.SCENE_UI);
    };
    p.onResourceLoadProgress = function (itemsLoaded, itemsTotal) {
        App.ControllerManager.applyFunc(ControlConstants.LOADING, LoadingConstants.SetProgress, itemsLoaded, itemsTotal);
    };
    /**
     * 初始化所有模块
     */
    p.initModule = function () {
        App.ControllerManager.register(ControlConstants.Home, new HomeControl());
    };
    return MainGameEntry;
}());
egret.registerClass(MainGameEntry,'MainGameEntry');
//# sourceMappingURL=MainGameEntry.js.map