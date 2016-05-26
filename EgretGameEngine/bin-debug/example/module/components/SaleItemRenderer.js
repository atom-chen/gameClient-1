/**
 * 商品的渲染器
 */
var SaleItemRenderer = (function (_super) {
    __extends(SaleItemRenderer, _super);
    function SaleItemRenderer() {
        _super.call(this);
    }
    var d = __define,c=SaleItemRenderer,p=c.prototype;
    p.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.titleDisplay) {
            this.titleDisplay.text = this.data.title;
        }
        if (this.priceDisplay) {
            this.priceDisplay.text = this.data.price;
        }
        if (this.timeDisplay) {
            this.timeDisplay.text = this.data.time;
        }
        if (this.iconDisplay) {
            this.iconDisplay.source = this.data.icon;
        }
    };
    p.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (!this.data)
            return;
        if (instance == this.titleDisplay) {
            this.titleDisplay.text = this.data.title;
        }
        if (instance == this.priceDisplay) {
            this.priceDisplay.text = this.data.price;
        }
        if (instance == this.timeDisplay) {
            this.timeDisplay.text = this.data.time;
        }
        if (instance == this.iconDisplay) {
            this.iconDisplay.source = this.data.icon;
        }
    };
    return SaleItemRenderer;
}(eui.ItemRenderer));
egret.registerClass(SaleItemRenderer,'SaleItemRenderer');
//# sourceMappingURL=SaleItemRenderer.js.map