class Main extends egret.DisplayObjectContainer
{
	constructor()
	{
		super();
		if (this.stage)
		{
			this.init();
		} else
		{
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.handlerAddToStageEvt, this);
		}
	}

	private handlerAddToStageEvt(ev:egret.Event):void
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.handlerAddToStageEvt, this);
		this.init();
	}

	private init():void
	{
		//注册解析器
		this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
		this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

		//适配方式
		if (App.DeviceUtils.IsPC)
		{
			App.StageUtils.setScaleMode(egret.StageScaleMode.SHOW_ALL);
		}

		//初始化
		this.initScene();
		this.initModule();
		App.SceneManager.runScene(SceneConstants.SCENE_LOADING);


		this.initGameConfig();

	}

	private initGameConfig():void
	{
		App.ResourceUtils.addConfig("resource/gameEuiRes.json", "resource/");
		App.ResourceUtils.addConfig("resource/gameRes.json", "resource/");
		App.ResourceUtils.loadConfig(this.onConfigComplete, this);
	}


	private onConfigComplete():void
	{
		var theme:eui.Theme = new eui.Theme("resource/default.thm.json", this.stage);
		//主题配置加载完成
		theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeComplete, this);
	}

	private onThemeComplete():void
	{
		var btn:eui.Button=new eui.Button();
		this.addChild(btn);
		btn.label="hhhhh";
		btn.x=200;

		new MainGameEntry();
	}

	private initScene():void
	{
		App.SceneManager.register(SceneConstants.SCENE_LOADING, new SceneLoading);
	}

	private initModule():void
	{
		App.ControllerManager.register(ModuleContronConstants.LOADING, new LoadingControl);
	}
}