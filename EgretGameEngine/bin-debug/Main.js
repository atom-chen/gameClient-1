var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        //注入自定义的素材解析器
        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //适配方式
        if (App.DeviceUtils.IsPC) {
            App.StageUtils.setScaleMode(egret.StageScaleMode.SHOW_ALL);
        }
        //初始化
        this.initScene();
        this.initModule();
        //设置加载进度界面
        App.SceneManager.runScene(SceneConsts.LOADING);
        //加载资源版本号
        if (false) {
            App.ResVersionManager.loadConfig("resource/resource_version.json", this.loadResVersionComplate, this);
        }
        else {
            this.loadResVersionComplate();
        }
    };
    p.loadResVersionComplate = function () {
        //初始化Resource资源加载库
        App.ResourceUtils.addConfig("resource/default.res.json", "resource/");
        App.ResourceUtils.addConfig("resource/resource_core.json", "resource/");
        App.ResourceUtils.addConfig("resource/resource_ui.json", "resource/");
        App.ResourceUtils.addConfig("resource/resource_battle.json", "resource/");
        App.ResourceUtils.loadConfig(this.onConfigComplete, this);
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    p.onConfigComplete = function () {
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    };
    /**
     * 主题文件加载完成
     */
    p.onThemeLoadComplete = function () {
        // new EUITest();
        new ActTest();
        // new ProtoBufTest();
        // new StarlingSwfTest();
    };
    /**
     * 初始化所有场景
     */
    p.initScene = function () {
        App.SceneManager.register(SceneConsts.LOADING, new LoadingScene());
        App.SceneManager.register(SceneConsts.UI, new UIScene());
        App.SceneManager.register(SceneConsts.Game, new GameScene());
    };
    /**
     * 初始化所有模块
     */
    p.initModule = function () {
        App.ControllerManager.register(ControllerConst.Loading, new LoadingController());
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map