/**
 * Created by yangsong on 15-3-27.
 * ProtoBuf测试
 */
var ProtoBufTest = (function () {
    function ProtoBufTest() {
        App.ResourceUtils.loadGroup("preload_core", this.onResourceLoadComplete, this.onResourceLoadProgress, this);
    }
    var d = __define,c=ProtoBufTest,p=c.prototype;
    /**
     * 资源组加载完成
     */
    p.onResourceLoadComplete = function () {
        App.Init();
        this.clientTest();
        this.socketTest();
    };
    /**
     * 资源组加载进度
     */
    p.onResourceLoadProgress = function (itemsLoaded, itemsTotal) {
        App.ControllerManager.applyFunc(ControllerConst.Loading, LoadingConst.SetProgress, itemsLoaded, itemsTotal);
    };
    p.clientTest = function () {
        //初始化simple_proto
        var message = dcodeIO.ProtoBuf.loadProto(RES.getRes("simple_proto"));
        //创建user_login_class
        var user_login_class = message.build("user_login_c2s");
        //创建一条消息
        var user_login = new user_login_class({
            "accid": 888,
            "tstamp": 999,
            "ticket": "yangsong"
        });
        //序列化
        var bytes = user_login.toArrayBuffer();
        Log.trace("序列化数据：", bytes);
        //反序列化
        var new_user_login = user_login_class.decode(bytes);
        Log.trace("反序列化数据：", new_user_login);
    };
    p.socketTest = function () {
        //发送一条消息到服务器
        function send() {
            var msg = {};
            msg.key = "user_login_c2s";
            msg.body = {
                "accid": 888,
                "tstamp": 999,
                "ticket": "yangsong"
            };
            App.Socket.send(msg);
        }
        App.Socket.connect();
        App.MessageCenter.addListener(SocketConst.SOCKET_CONNECT, function () {
            Log.trace("与服务器连接上");
            send();
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_RECONNECT, function () {
            Log.trace("与服务器重新连接上");
            send();
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_START_RECONNECT, function () {
            Log.trace("开始与服务器重新连接");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_CLOSE, function () {
            Log.trace("与服务器断开连接");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_NOCONNECT, function () {
            Log.trace("服务器连接不上");
        }, this);
        App.MessageCenter.addListener("10001", function (msg) {
            Log.trace("收到服务器消息:", msg);
        }, this);
    };
    return ProtoBufTest;
}());
egret.registerClass(ProtoBufTest,'ProtoBufTest');
//# sourceMappingURL=ProtoBufTest.js.map