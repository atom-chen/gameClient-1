/**
 * Created by yangsong on 15-3-27.
 * StarlingSwf测试
 */
var StarlingSwfTest = (function () {
    function StarlingSwfTest() {
        //StarlingSwf使用
        App.StarlingSwfFactory.addSwf("bossMC", RES.getRes("bossMC_swf_json"), RES.getRes("bossMC_json"));
        var mc = App.StarlingSwfFactory.makeMc("boss_whiteBear");
    }
    var d = __define,c=StarlingSwfTest,p=c.prototype;
    return StarlingSwfTest;
}());
egret.registerClass(StarlingSwfTest,'StarlingSwfTest');
//# sourceMappingURL=StarlingSwfTest.js.map