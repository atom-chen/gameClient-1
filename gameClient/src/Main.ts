class Main extends eui.UILayer
{
	/**
	 * 加载进度界面
	 * loading process interface
	 */
	private loadingView:LoadingUI;

	protected createChildren():void
	{
		super.createChildren();
		//inject the custom material parser
		//注入自定义的素材解析器
		var assetAdapter = new AssetAdapter();
		this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
		this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
		//Config loading process interface
		//设置加载进度界面
		this.loadingView = new LoadingUI();
		this.stage.addChild(this.loadingView);
		// initialize the Resource loading library
		//初始化Resource资源加载库
		RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
		RES.loadConfig("resource/default.res.json", "resource/");
	}

	/**
	 * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
	 * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
	 */
	private onConfigComplete(event:RES.ResourceEvent):void
	{
		RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
		// load skin theme configuration file, you can manually modify the file. And replace the default skin.
		//加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
		var theme = new eui.Theme("resource/default.thm.json", this.stage);
		theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
		RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
		RES.loadGroup("preload");
	}

	private isThemeLoadEnd:boolean = false;

	/**
	 * 主题文件加载完成,开始预加载
	 * Loading of theme configuration file is complete, start to pre-load the
	 */
	private onThemeLoadComplete():void
	{
		this.isThemeLoadEnd = true;
		this.createScene();
	}

	private isResourceLoadEnd:boolean = false;

	/**
	 * preload资源组加载完成
	 * preload resource group is loaded
	 */
	private onResourceLoadComplete(event:RES.ResourceEvent):void
	{
		if (event.groupName == "preload")
		{
			this.stage.removeChild(this.loadingView);
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
			RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
			this.isResourceLoadEnd = true;
			this.createScene();
		}
	}

	private createScene()
	{
		if (this.isThemeLoadEnd && this.isResourceLoadEnd)
		{
			this.startCreateScene();
		}
	}

	/**
	 * 资源组加载出错
	 *  The resource group loading failed
	 */
	private onItemLoadError(event:RES.ResourceEvent):void
	{
		console.warn("Url:" + event.resItem.url + " has failed to load");
	}

	/**
	 * 资源组加载出错
	 * Resource group loading failed
	 */
	private onResourceLoadError(event:RES.ResourceEvent):void
	{
		//TODO
		console.warn("Group:" + event.groupName + " has failed to load");
		//忽略加载失败的项目
		//ignore loading failed projects
		this.onResourceLoadComplete(event);
	}

	/**
	 * preload资源组加载进度
	 * loading process of preload resource
	 */
	private onResourceProgress(event:RES.ResourceEvent):void
	{
		if (event.groupName == "preload")
		{
			this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
		}
	}

	/**
	 * 创建场景界面
	 * Create scene interface
	 */
	protected startCreateScene():void
	{
		// ClientSocket.getInstance().init("ws://192.168.1.92", 8887);

		this.makeGrid();
		this.makePlayer();
	}

	private hero:egret.MovieClip;
	private heroDataFactory:egret.MovieClipDataFactory;

	private _cellSize:number = 40;
	private _grid:Grid;
	private _index:number;
	private _path:NodePoint[];

	private _lineShape:egret.Shape;
	private _gridContent:egret.DisplayObjectContainer;

	private makePlayer():void
	{
		var map:egret.Bitmap = new egret.Bitmap();
		map.texture = RES.getRes("map");
		this.addChild(map);
		map.width = this.stage.stageWidth;
		map.height = this.stage.stageHeight;


		var data = RES.getRes("heroJson");
		var tex = RES.getRes("hero");
		var mcf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, tex);
		var clipData:egret.MovieClipData = mcf.generateMovieClipData("y_idle");
		this.heroDataFactory = mcf;


		this.hero = new egret.MovieClip(clipData);
		this.addChild(this.hero);


		this.hero.x = this.hero.width;
		this.hero.y = this.hero.height;
		this.hero.play(-1);
	}

	private makeGrid():void
	{
		this._gridContent = new egret.DisplayObjectContainer();
		this._gridContent.touchEnabled = true;
		this._gridContent.touchChildren = false;
		this._gridContent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGridClick, this);
		this.addChild(this._gridContent);

		this._grid = new Grid(16, 26, 40);
		//随机障碍物
		// for (var i:number = 0; i < 20; i++)
		// {
		// 	this._grid.setWalkable(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), false);
		// }
		this.drawGrid();
	}

	private drawGrid():void
	{
		var rect:egret.Shape = new egret.Shape();
		this._gridContent.addChild(rect);
		for (var i:number = 0; i < this._grid.numCols; i++)
		{
			for (var j:number = 0; j < this._grid.numRows; j++)
			{
				var node:NodePoint = this._grid.getNode(i, j);
				rect.graphics.lineStyle(1);
				rect.graphics.beginFill(this.getColor(node));
				rect.graphics.drawRect(i * this._cellSize, j * this._cellSize, this._cellSize, this._cellSize);
			}
		}
		rect.graphics.endFill();
	}

	private getColor(node:NodePoint):number
	{
		if (!node.walkable) return 0x000000;
		if (node == this._grid.startNode) return 0x999900;
		if (node == this._grid.endNode) return 0x0000ff;
		return 0xcccccc;
	}

	private onGridClick(event:egret.TouchEvent):void
	{
		var xpos:number = Math.floor(event.stageX / this._cellSize);
		var ypos:number = Math.floor(event.stageY / this._cellSize);
		var endNp:NodePoint = this._grid.getNode(xpos, ypos);


		var xpos2:number = Math.floor(this.hero.x / this._cellSize);
		var ypos2:number = Math.floor(this.hero.y / this._cellSize);
		var startNp:NodePoint = this._grid.getNode(xpos2, ypos2);

		this.hero.movieClipData = this.heroDataFactory.generateMovieClipData("y_move");
		this.hero.play(-1);

		if (endNp.x > startNp.x)
		{
			this.hero.scaleX = 1;
		} else
		{
			this.hero.scaleX = -1;
		}

		if (endNp.walkable == false)
		{
			var replacer:NodePoint = this._grid.findReplacer(startNp, endNp);
			if (replacer)
			{
				xpos = replacer.x;
				ypos = replacer.y;
			}
		}

		this._grid.setStartNode(xpos2, ypos2);
		this._grid.setEndNode(xpos, ypos);

		this.findPath();
	}

	private findPath():void
	{
		var astar:AStar2 = new AStar2();
		if (astar.findPath(this._grid))
		{
			//得到平滑路径
			astar.floyd();
			//在路径中去掉起点节点，避免玩家对象走回头路
			astar.floydPath.shift();
			this._path = astar.floydPath;
			// this._path = astar.path;
			this._index = 0;

			if (this.hasEventListener(egret.Event.ENTER_FRAME))
			{
				this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			}
			this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		}
	}

	private onEnterFrame(evt:egret.TimerEvent)
	{
		if (this._path.length == 0)
		{
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			return;
		}

		var targetX:number = this._path[this._index].x * this._cellSize + this._cellSize / 2;
		var targetY:number = this._path[this._index].y * this._cellSize + this._cellSize / 2;
		var dx:number = targetX - this.hero.x;
		var dy:number = targetY - this.hero.y;

		var dist:number = Math.sqrt(dx * dx + dy * dy);
		if (dist < 1)
		{
			this._index++;
			if (this._index >= this._path.length)
			{
				this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);

				this.hero.movieClipData = this.heroDataFactory.generateMovieClipData("y_idle");
				this.hero.play(-1);
			}
		}
		else
		{
			this.hero.x += dx * .25;
			this.hero.y += dy * .25;
		}
	}
}
