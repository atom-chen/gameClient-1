/**
 * Created by xiaoding on 2016/6/8.
 */
class LoadingView extends BaseEuiView
{
	constructor($controller:BaseController, $parent:egret.DisplayObjectContainer)
	{
		super($controller, $parent);
		this.skinName = "resource/skins/LoadingUISkin.exml";
	}

	public txtMsg:eui.Label;

	public setProgress(current:number, total:number):void
	{
		this.txtMsg.text = "游戏资源加载中..." + current + "/" + total;
	}
}