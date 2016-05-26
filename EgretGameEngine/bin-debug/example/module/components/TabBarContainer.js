/**
 * tabbar附加一个容器
 */
var TabBarContainer = (function (_super) {
    __extends(TabBarContainer, _super);
    function TabBarContainer(skinName) {
        if (skinName === void 0) { skinName = null; }
        _super.call(this);
        //默认皮肤
        if (!skinName) {
            skinName = "resource/skins/TabBarSkin.exml";
        }
        this._tabBarItemRendererSkinName = "resource/skins/TabBarButtonSkin.exml";
        this._tabBarItemRenderer = TabBarButton;
        this._dp = new eui.ArrayCollection();
        this._views = [];
        this.skinName = skinName;
    }
    var d = __define,c=TabBarContainer,p=c.prototype;
    p.onTabBarIndexChanged = function (e) {
        this.viewStack.selectedIndex = this.tabBar.selectedIndex;
    };
    p.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.tabBar) {
            this.tabBar.itemRendererSkinName = this._tabBarItemRendererSkinName;
            this.tabBar.itemRenderer = this._tabBarItemRenderer;
            this.tabBar.dataProvider = this._dp;
            this.tabBar.addEventListener(egret.Event.CHANGE, this.onTabBarIndexChanged, this);
        }
        else if (instance == this.viewStack) {
            for (var i = 0; i < this._views.length; i++) {
                this.viewStack.addChild(this._views[i]);
            }
            this._views.length = 0;
            this.tabBar.selectedIndex = 0;
            this.viewStack.selectedIndex = 0;
        }
    };
    d(p, "tabBarItemRendererSkinName",undefined
        ,function (value) {
            this._tabBarItemRendererSkinName = value;
            if (this.tabBar) {
                this.tabBar.itemRendererSkinName = this._tabBarItemRendererSkinName;
            }
        }
    );
    d(p, "tabBarItemRenderer",undefined
        ,function (value) {
            this._tabBarItemRenderer = value;
            if (this.tabBar) {
                this.tabBar.itemRenderer = this._tabBarItemRenderer;
            }
        }
    );
    /**
     *  添加一项到ViewStack
     * @param title
     * @param titleSelected
     * @param content
     */
    p.addViewStackElement = function (title, titleSelected, content) {
        this._dp.addItem({ "title": title, "titleSelected": titleSelected });
        if (this.viewStack) {
            this.viewStack.addChild(content);
        }
        else {
            this._views.push(content);
        }
    };
    return TabBarContainer;
}(eui.Component));
egret.registerClass(TabBarContainer,'TabBarContainer');
//# sourceMappingURL=TabBarContainer.js.map