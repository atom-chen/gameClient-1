/**
 * Created by egret on 15-1-16.
 */
var BaseGameObject = (function (_super) {
    __extends(BaseGameObject, _super);
    function BaseGameObject($controller) {
        _super.call(this);
        this.originX = 0;
        this.originY = 0;
        this.originZ = 0;
        this.trueY = 0;
        this.armature = new DragonBonesArmatureContainer();
        this.addChild(this.armature);
        this.controller = $controller;
    }
    var d = __define,c=BaseGameObject,p=c.prototype;
    p.init = function () {
        this.hp = 300;
        this.isDie = false;
        App.TimerManager.doFrame(1, 0, this.onFrame, this);
    };
    p.destory = function () {
        this.armature.stop();
        App.TimerManager.remove(this.onFrame, this);
        App.DisplayUtils.removeFromParent(this);
        ObjectPool.push(this);
    };
    p.onFrame = function (time) {
        this.update(time);
        this.setPos();
    };
    p.setPos = function () {
        if (this.$getX() != this.originX) {
            this.$setX(this.originX);
        }
        if (this.$getY() != this.trueY) {
            this.$setY(this.trueY);
        }
    };
    p.update = function (time) {
    };
    p.registerArmature = function (actionName) {
    };
    d(p, "x"
        ,function () {
            return this.originX;
        }
        ,function (value) {
            this.originX = value;
        }
    );
    d(p, "y"
        ,function () {
            return this.originY;
        }
        ,function (value) {
            this.originY = value;
            this.trueY = this.originY + this.originZ;
        }
    );
    d(p, "z"
        ,function () {
            return this.originZ;
        }
        ,function (value) {
            this.originZ = value;
            this.trueY = this.originY + this.originZ;
        }
    );
    d(p, "gameController"
        ,function () {
            return this.controller;
        }
    );
    p.isMyFront = function (obj) {
        return this.scaleX == 1 ? this.x <= obj.x : this.x >= obj.x;
    };
    p.isMyBack = function (obj) {
        return this.scaleX == -1 ? this.x <= obj.x : this.x >= obj.x;
    };
    p.isMyLeft = function (obj) {
        return this.scaleX == -1 ? this.y <= obj.y : this.y >= obj.y;
    };
    p.isMyRight = function (obj) {
        return this.scaleX == 1 ? this.y <= obj.y : this.y >= obj.y;
    };
    p.isMyTop = function (obj) {
        return this.z >= obj.z;
    };
    p.isMyDown = function (obj) {
        return this.z <= obj.z;
    };
    BaseGameObject.ACTION_Idle = "daiji";
    BaseGameObject.ACTION_Move = "yidong";
    BaseGameObject.ACTION_Hart = "beiji";
    BaseGameObject.ACTION_Fly = "jifei";
    BaseGameObject.ACTION_Land = "daodi";
    BaseGameObject.ACTION_jump = "jump";
    return BaseGameObject;
}(egret.DisplayObjectContainer));
egret.registerClass(BaseGameObject,'BaseGameObject');
//# sourceMappingURL=BaseGameObject.js.map