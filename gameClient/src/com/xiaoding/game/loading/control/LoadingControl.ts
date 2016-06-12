/**
 * Created by xiaoding on 2016/6/8.
 */
class LoadingControl extends BaseController
{
	private loadingView:LoadingView;

	constructor()
	{
		super();

		//一般在控制模块里注册视图
		this.loadingView = new LoadingView(this, LayerManager.UI_Main);
		App.ViewManager.register(ViewConstants.Loading, this.loadingView);

		//跨模块调用前必须先注册事件监听
		this.registerFunc(LoadingConstants.SetProgress, this.setProgress, this);
	}

	private setProgress(current:number, total:number):void
	{
		this.loadingView.setProgress(current, total);
	}
}