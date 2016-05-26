/**
 * Created by Administrator on 2014/11/23.
 */
var LoginView = (function (_super) {
    __extends(LoginView, _super);
    function LoginView($controller, $parent) {
        _super.call(this, $controller, $parent);
    }
    var d = __define,c=LoginView,p=c.prototype;
    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
    };
    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    p.initData = function () {
        _super.prototype.initData.call(this);
    };
    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    p.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i - 0] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
    };
    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    p.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i - 0] = arguments[_i];
        }
        _super.prototype.close.call(this, param);
    };
    /**
     * 请求登陆处理
     * @param userName
     * @param pwd
     */
    p.onLogin = function () {
        var userName = "yangsong";
        var pwd = "123456";
        //进行基础检测
        if (userName == null || userName.length == 0) {
            return;
        }
        if (pwd == null || pwd.length == 0) {
            return;
        }
        this.applyFunc(LoginConst.LOGIN_C2S, userName, pwd);
    };
    /**
     * 登陆成功处理
     */
    p.loginSuccess = function () {
        //TODO 登陆成功处理
    };
    return LoginView;
}(BaseEuiView));
egret.registerClass(LoginView,'LoginView');
//# sourceMappingURL=LoginView.js.map