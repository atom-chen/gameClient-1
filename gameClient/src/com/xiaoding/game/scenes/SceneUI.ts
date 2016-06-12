/**
 * Created by xiaoding on 2016/6/8.
 */
class SceneUI extends BaseScene
{
	constructor()
	{
		super();

	}

	public onEnter():void
	{
		super.onEnter();

		//添加该Scene使用的层级
		this.addLayer(LayerManager.UI_Main);
		this.addLayer(LayerManager.UI_Popup);
		this.addLayer(LayerManager.UI_Message);
		this.addLayer(LayerManager.UI_Tips);


		var rect:eui.Rect = new eui.Rect();
		rect.fillColor = 0x78b93f;
		rect.percentHeight = 100;
		rect.percentWidth = 100;
		LayerManager.UI_Main.addChild(rect);

		//打开主页
		App.ViewManager.open(ViewConstants.Home);
	}
}