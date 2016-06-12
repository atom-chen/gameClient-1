/**
 * Created by xiaoding on 2016/6/12.
 */
class HomeControl extends BaseController
{
	private homeView:HomeView;

	constructor()
	{
		super();

		this.homeView = new HomeView(this, LayerManager.UI_Main);
		App.ViewManager.register(ViewConstants.Home, this.homeView);
		
	}
}