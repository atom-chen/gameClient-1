/**
 * 任务的渲染器
 */
var TaskItemRenderer = (function (_super) {
    __extends(TaskItemRenderer, _super);
    function TaskItemRenderer() {
        _super.call(this);
    }
    var d = __define,c=TaskItemRenderer,p=c.prototype;
    p.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.iconDisplay) {
            this.iconDisplay.source = this.data.icon;
        }
        if (this.goldDisplay) {
            this.goldDisplay.text = this.data.gold;
        }
        if (this.seedDisplay) {
            this.seedDisplay.text = this.data.seed;
        }
        if (this.progressDisplay) {
            this.progressDisplay.text = this.data.progress;
        }
        if (this.labelDisplay) {
            this.labelDisplay.text = this.data.label;
        }
    };
    p.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (!this.data)
            return;
        if (instance == this.iconDisplay) {
            this.iconDisplay.source = this.data.icon;
        }
        if (instance == this.goldDisplay) {
            this.goldDisplay.text = this.data.gold;
        }
        if (instance == this.seedDisplay) {
            this.seedDisplay.text = this.data.seed;
        }
        if (instance == this.progressDisplay) {
            this.progressDisplay.text = this.data.progress;
        }
        if (instance == this.labelDisplay) {
            this.labelDisplay.text = this.data.label;
        }
    };
    return TaskItemRenderer;
}(eui.ItemRenderer));
egret.registerClass(TaskItemRenderer,'TaskItemRenderer');
//# sourceMappingURL=TaskItemRenderer.js.map