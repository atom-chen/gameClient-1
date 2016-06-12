/**
 * Created by xiaoding on 2016/6/8.
 */
class SceneLoading extends BaseScene
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

		//初始打开Loading页面前必须先注册视图（在控制模块中）
		App.ViewManager.open(ViewConstants.Loading);
	}
}