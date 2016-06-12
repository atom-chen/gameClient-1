/**
 * Created by xiaoding on 2016/6/8.
 */
class MainGameEntry
{
	constructor()
	{
		var groupName:string = "preload";
		var subGroups:Array<string> = ["gameEuiRes", "preload", "animations", "maps", "iconhero", "iconItem", "efts", "equips", "shenqis", "ui2", "gameLevel", "iconTask"];
		App.ResourceUtils.loadGroups(groupName, subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
	}

	private onResourceLoadComplete():void
	{
		this.initModule();

		App.SceneManager.runScene(SceneConstants.SCENE_UI);
	}

	private onResourceLoadProgress(itemsLoaded:number, itemsTotal:number):void
	{
		App.ControllerManager.applyFunc(ControlConstants.LOADING, LoadingConstants.SetProgress, itemsLoaded, itemsTotal);
	}


	/**
	 * 初始化所有模块
	 */
	private initModule():void
	{
		App.ControllerManager.register(ControlConstants.Home, new HomeControl());
	}
}