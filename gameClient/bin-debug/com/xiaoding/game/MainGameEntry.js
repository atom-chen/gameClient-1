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
    };
    p.onResourceLoadProgress = function (itemsLoaded, itemsTotal) {
        console.info((itemsLoaded / itemsTotal * 100));
    };
    return MainGameEntry;
}());
egret.registerClass(MainGameEntry,'MainGameEntry');
//# sourceMappingURL=MainGameEntry.js.map