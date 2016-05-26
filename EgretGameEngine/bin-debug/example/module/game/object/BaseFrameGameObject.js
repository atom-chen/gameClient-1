/**
 * Created by egret on 15-1-27.
 */
var BaseFrameGameObject = (function (_super) {
    __extends(BaseFrameGameObject, _super);
    function BaseFrameGameObject($controller) {
        _super.call(this, $controller);
    }
    var d = __define,c=BaseFrameGameObject,p=c.prototype;
    p.initFrameData = function ($dragonBonesDataName) {
        this.attackConfig = RES.getRes("attack_json")[$dragonBonesDataName];
        if (this.attackConfig) {
            this.armature.addFrameCallFunc(this.armatureEventHandle, this);
        }
    };
    p.armatureEventHandle = function (e) {
        var actionStr = this.attackConfig[e.frameLabel].action || "";
        var actions = actionStr.split(",");
        for (var i = 0, len = actions.length; i < len; i++) {
            var arr = actions[i].split("_");
            var funcName = arr[0];
            arr[0] = e.frameLabel;
            this[funcName].apply(this, arr);
        }
    };
    p.frameEnemyHart = function (frameLabel, speed, xMoveDis, shock) {
        if (shock === void 0) { shock = "0"; }
        var attDis = this.attackConfig[frameLabel].dis;
        var attackObjs = this.gameController.getMyAttackObjects(this, attDis);
        if (attackObjs.length && shock == "1") {
            this.frameShock();
        }
        for (var i = 0, len = attackObjs.length; i < len; i++) {
            attackObjs[i].hart(this, parseInt(speed), parseInt(xMoveDis));
        }
    };
    p.frameEnemyFly = function (frameLabel, speedZ, speedX, shock) {
        if (shock === void 0) { shock = "0"; }
        var attDis = this.attackConfig[frameLabel].dis;
        var attackObjs = this.gameController.getMyAttackObjects(this, attDis);
        if (attackObjs.length && shock == "1") {
            this.frameShock();
        }
        for (var i = 0, len = attackObjs.length; i < len; i++) {
            attackObjs[i].fly(this, parseInt(speedZ), parseInt(speedX));
        }
    };
    p.frameEnemyHartMoveToZ = function (frameLabel, speedZ, attract) {
        if (attract === void 0) { attract = "0"; }
        var attDis = this.attackConfig[frameLabel].dis;
        var attackObjs = this.gameController.getMyAttackObjects(this, attDis);
        for (var i = 0, len = attackObjs.length; i < len; i++) {
            attackObjs[i].hartFly(this, parseInt(speedZ), parseInt(attract) == 1);
        }
    };
    p.frameThisMoveTo = function (frameLabel, speed, xMoveDis) {
        this.moveTo(parseInt(speed), this.x + (this.scaleX * parseInt(xMoveDis)), this.y);
    };
    p.frameThisMoveToZ = function (frameLabel, $speedZ) {
        this.moveToZ(parseInt($speedZ));
    };
    p.frameThisStandLand = function (frameLabel) {
        this.standLand();
    };
    p.frameShock = function (frameLabel) {
        if (frameLabel === void 0) { frameLabel = null; }
        this.gameController.shock();
    };
    return BaseFrameGameObject;
}(BaseHitGameObject));
egret.registerClass(BaseFrameGameObject,'BaseFrameGameObject');
//# sourceMappingURL=BaseFrameGameObject.js.map