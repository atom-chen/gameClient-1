var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        if (this.stage) {
            this.init();
        }
        else {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.handlerAddToStageEvt, this);
        }
    }
    var d = __define,c=Main,p=c.prototype;
    p.handlerAddToStageEvt = function (ev) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.handlerAddToStageEvt, this);
        this.init();
    };
    p.init = function () {
        //注册解析器
        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //适配方式
        if (App.DeviceUtils.IsPC) {
            App.StageUtils.setScaleMode(egret.StageScaleMode.SHOW_ALL);
        }
        //初始化
        this.initScene();
        this.initModule();
        App.SceneManager.runScene(SceneConstants.SCENE_LOADING);
        this.initGameConfig();
    };
    p.initGameConfig = function () {
        App.ResourceUtils.addConfig("resource/gameEuiRes.json", "resource/");
        App.ResourceUtils.addConfig("resource/gameRes.json", "resource/");
        App.ResourceUtils.loadConfig(this.onConfigComplete, this);
    };
    p.onConfigComplete = function () {
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        //主题配置加载完成
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeComplete, this);
    };
    p.onThemeComplete = function () {
        var btn = new eui.Button();
        this.addChild(btn);
        btn.label = "hhhhh";
        btn.x = 200;
        new MainGameEntry();
    };
    p.initScene = function () {
        App.SceneManager.register(SceneConstants.SCENE_LOADING, new SceneLoading);
    };
    p.initModule = function () {
        App.ControllerManager.register(ModuleContronConstants.LOADING, new LoadingControl);
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map