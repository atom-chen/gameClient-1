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
	}

	private onResourceLoadProgress(itemsLoaded:number, itemsTotal:number):void
	{
		console.info((itemsLoaded / itemsTotal * 100));
	}
}