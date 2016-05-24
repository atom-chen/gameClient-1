var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
        this.isThemeLoadEnd = false;
        this.isResourceLoadEnd = false;
        this._cellSize = 40;
    }
    var d = __define,c=Main,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
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
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    p.onConfigComplete = function (event) {
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
    };
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    p.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = true;
        this.createScene();
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    };
    p.createScene = function () {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            this.startCreateScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    p.startCreateScene = function () {
        // ClientSocket.getInstance().init("ws://192.168.1.92", 8887);
        this.makeGrid();
        this.makePlayer();
    };
    p.makePlayer = function () {
        this._player = new egret.Sprite();
        //this._player.touchChildren = false;
        this._player.touchEnabled = true; //当为true时 点击事件会穿过该对象到达侦听对象
        this._player.graphics.beginFill(0xff0000);
        this._player.graphics.drawCircle(0, 0, 5);
        this._player.graphics.endFill();
        this._player.x = 50;
        this._player.y = 60;
        this.addChild(this._player);
        this._lineShape = new egret.Shape();
        this.addChild(this._lineShape);
    };
    p.makeGrid = function () {
        this._gridContent = new egret.DisplayObjectContainer();
        this._gridContent.touchEnabled = true;
        this._gridContent.touchChildren = false;
        this._gridContent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGridClick, this);
        this.addChild(this._gridContent);
        this._grid = new Grid(16, 26, 40);
        //随机障碍物
        for (var i = 0; i < 20; i++) {
            this._grid.setWalkable(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), false);
        }
        this.drawGrid();
    };
    p.drawGrid = function () {
        var rect = new egret.Shape();
        this._gridContent.addChild(rect);
        for (var i = 0; i < this._grid.numCols; i++) {
            for (var j = 0; j < this._grid.numRows; j++) {
                var node = this._grid.getNode(i, j);
                rect.graphics.lineStyle(1);
                rect.graphics.beginFill(this.getColor(node));
                rect.graphics.drawRect(i * this._cellSize, j * this._cellSize, this._cellSize, this._cellSize);
            }
        }
        rect.graphics.endFill();
    };
    p.getColor = function (node) {
        if (!node.walkable)
            return 0x000000;
        if (node == this._grid.startNode)
            return 0x999900;
        if (node == this._grid.endNode)
            return 0x0000ff;
        return 0xcccccc;
    };
    p.onGridClick = function (event) {
        var xpos = Math.floor(event.stageX / this._cellSize);
        var ypos = Math.floor(event.stageY / this._cellSize);
        var endNp = this._grid.getNode(xpos, ypos);
        var xpos2 = Math.floor(this._player.x / this._cellSize);
        var ypos2 = Math.floor(this._player.y / this._cellSize);
        var startNp = this._grid.getNode(xpos2, ypos2);
        if (endNp.walkable == false) {
            var replacer = this._grid.findReplacer(startNp, endNp);
            if (replacer) {
                xpos = replacer.x;
                ypos = replacer.y;
            }
        }
        this._grid.setStartNode(xpos2, ypos2);
        this._grid.setEndNode(xpos, ypos);
        this.findPath();
        ////画红线
        this._lineShape.graphics.clear();
        this._lineShape.graphics.lineStyle(1, 0xFF0000);
        this._lineShape.graphics.moveTo(xpos2 * this._cellSize + 10, ypos2 * this._cellSize + 10);
        this._lineShape.graphics.lineTo(xpos * this._cellSize + 10, ypos * this._cellSize + 10);
        this._lineShape.graphics.endFill();
    };
    p.findPath = function () {
        var astar = new AStar2();
        if (astar.findPath(this._grid)) {
            //得到平滑路径
            astar.floyd();
            //在路径中去掉起点节点，避免玩家对象走回头路
            astar.floydPath.shift();
            this._path = astar.floydPath;
            //this._path = astar.path;
            this._index = 0;
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        }
    };
    p.onEnterFrame = function (evt) {
        if (this._path.length == 0) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            return;
        }
        var targetX = this._path[this._index].x * this._cellSize + this._cellSize / 2;
        var targetY = this._path[this._index].y * this._cellSize + this._cellSize / 2;
        var dx = targetX - this._player.x;
        var dy = targetY - this._player.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1) {
            this._index++;
            if (this._index >= this._path.length) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            }
        }
        else {
            this._player.x += dx * .5;
            this._player.y += dy * .5;
        }
    };
    return Main;
}(eui.UILayer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map