/**
 * tabbar的按钮
 */
var TabBarButton = (function (_super) {
    __extends(TabBarButton, _super);
    function TabBarButton() {
        _super.call(this);
    }
    var d = __define,c=TabBarButton,p=c.prototype;
    d(p, "data"
        ,function () {
            return this.mydata;
        }
        ,function (value) {
            this.mydata = value;
            if (this.iconDisplay) {
                this.iconDisplay.source = this.data.title;
            }
            if (this.iconDisplaySelected) {
                this.iconDisplaySelected.source = this.data.titleSelected;
            }
        }
    );
    p.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (!this.data)
            return;
        if (instance == this.iconDisplay) {
            this.iconDisplay.source = this.data.title;
        }
        if (instance == this.iconDisplaySelected) {
            this.iconDisplaySelected.source = this.data.titleSelected;
        }
    };
    return TabBarButton;
}(eui.ItemRenderer));
egret.registerClass(TabBarButton,'TabBarButton');
//# sourceMappingURL=TabBarButton.js.map