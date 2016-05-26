/**
 * Created by egret on 15-1-7.
 */
var MailController = (function (_super) {
    __extends(MailController, _super);
    function MailController() {
        _super.call(this);
        this.mailView = new MailView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Mail, this.mailView);
    }
    var d = __define,c=MailController,p=c.prototype;
    return MailController;
}(BaseController));
egret.registerClass(MailController,'MailController');
//# sourceMappingURL=MailController.js.map