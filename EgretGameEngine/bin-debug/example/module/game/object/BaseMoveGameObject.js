/**
 * Created by egret on 15-1-16.
 */
var BaseMoveGameObject = (function (_super) {
    __extends(BaseMoveGameObject, _super);
    function BaseMoveGameObject($controller) {
        _super.call(this, $controller);
        this.maxSpeedZ = 30;
        this.gravitySpeed = 1;
    }
    var d = __define,c=BaseMoveGameObject,p=c.prototype;
    p.init = function () {
        _super.prototype.init.call(this);
        this.speed = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.speedZ = 0;
        this.endX = 0;
        this.endY = 0;
        this.radian = 0;
        this.alpha = 1;
        this.isCommand = false;
    };
    p.destory = function () {
        _super.prototype.destory.call(this);
    };
    p.update = function (time) {
        _super.prototype.update.call(this, time);
        var func = "state_" + this.currState;
        if (this.currState) {
            this[func](time);
        }
    };
    p.state_idle = function (time) {
    };
    p.state_move = function (time) {
        var useSpeed = this.speed / (1000 / 60) * time;
        if (this.endX && this.endY) {
            this.radian = App.MathUtils.getRadian2(this.x, this.y, this.endX, this.endY);
            this.speedX = Math.cos(this.radian) * useSpeed;
            this.speedY = Math.sin(this.radian) * useSpeed * 0.65;
            var gotoX = this.x + this.speedX;
            var gotoY = this.y + this.speedY;
            if (gotoX < GameData.MIN_X
                || gotoX > GameData.MAX_X
                || gotoY < GameData.MIN_Y
                || gotoY > GameData.MAX_Y) {
                if (!this.isCommand) {
                    this.stopMove();
                    return;
                }
            }
            var dis = App.MathUtils.getDistance(this.x, this.y, this.endX, this.endY);
            if (dis < Math.abs(this.speedX) + Math.abs(this.speedY)) {
                this.stopMove();
                return;
            }
            this.x = gotoX;
            this.y = gotoY;
        }
        else {
            this.speedX = Math.cos(this.radian) * useSpeed;
            this.speedY = Math.sin(this.radian) * useSpeed * 0.65;
            var gotoX = this.x + this.speedX;
            var gotoY = this.y + this.speedY;
            if (gotoX < GameData.MIN_X || gotoX > GameData.MAX_X) {
                gotoX = this.x;
            }
            if (gotoY < GameData.MIN_Y || gotoY > GameData.MAX_Y) {
                gotoY = this.y;
            }
            this.x = gotoX;
            this.y = gotoY;
        }
    };
    p.state_attack = function (time) {
        if (this.speedZ) {
            this.state_jump(time);
        }
        else if (this.speed) {
            this.state_move(time);
        }
    };
    p.state_jump = function (time) {
        if (this.speed) {
            this.state_move(time);
        }
        if (this.speedZ > this.maxSpeedZ) {
            this.speedZ = this.maxSpeedZ;
        }
        else {
            this.speedZ += this.gravitySpeed;
        }
        var gotoZ = this.z + this.speedZ / (1000 / 60) * time;
        if (gotoZ > 0) {
            gotoZ = 0;
            this.stopJump();
        }
        this.z = gotoZ;
    };
    p.state_land = function (time) {
        if (this.isDie) {
            return;
        }
        this.landTime += time;
        if (this.landTime >= 1500) {
            this.leave();
        }
    };
    p.state_hurt = function (time) {
        if (this.speedZ || this.z < 0) {
            this.state_jump(time);
        }
        else if (this.speed) {
            this.state_move(time);
        }
    };
    p.stopJump = function () {
        this.speedZ = 0;
        if (!this.isAttack) {
            this.gotoLand();
        }
        if (this.isDie) {
            egret.Tween.get(this).to({ alpha: 0 }, 2000).call(function () {
                this.disappear();
                this.destory();
            }, this);
        }
    };
    /**
     * 死亡消失
     */
    p.disappear = function () {
    };
    p.stopMove = function () {
        this.speed = 0;
        this.isCommand = false;
        if (!this.isHurt && !this.isAttack && this.z == 0) {
            this.gotoIdle();
        }
    };
    p.leave = function () {
        this.gotoIdle();
    };
    //只移动不切换动作
    p.moveTo = function ($speed, $endX, $endY) {
        this.speed = $speed;
        this.endX = $endX;
        this.endY = $endY;
        this.radian = 0;
    };
    //行走到某个点
    p.walkTo = function ($speed, $endX, $endY) {
        this.moveTo($speed, $endX, $endY);
        this.scaleX = this.endX >= this.x ? 1 : -1;
        this.gotoMove();
    };
    //行走
    p.walk = function (xFlag, yFlag, $speed) {
        this.speed = $speed;
        this.endX = 0;
        this.endY = 0;
        this.radian = Math.atan2(yFlag, xFlag);
        this.scaleX = xFlag > 0 ? 1 : -1;
        this.gotoMove();
    };
    //跳起不切换动作
    p.moveToZ = function ($speedZ) {
        this.speedZ = $speedZ;
    };
    //强制落地
    p.standLand = function () {
        this.speedZ = 0;
        this.z = 0;
    };
    //跳起
    p.jump = function ($speedZ, $speedX) {
        if ($speedX === void 0) { $speedX = 0; }
        this.speed = Math.abs($speedX);
        this.radian = Math.atan2(0, $speedX > 0 ? 1 : -1);
        this.endX = 0;
        this.endY = 0;
        this.speedZ = $speedZ;
        this.gotoJump();
    };
    p.gotoIdle = function () {
        this.speed = 0;
        this.currState = BaseMoveGameObject.STATE_IDLE;
        this.armature.play(BaseMoveGameObject.ACTION_Idle, 0);
    };
    p.gotoMove = function () {
        this.currState = BaseMoveGameObject.STATE_MOVE;
        this.armature.play(BaseMoveGameObject.ACTION_Move, 0);
    };
    p.gotoAttack = function () {
        this.currState = BaseMoveGameObject.STATE_ATTACK;
    };
    p.gotoJump = function () {
        this.currState = BaseMoveGameObject.STATE_JUMP;
    };
    p.gotoLand = function () {
        this.landTime = 0;
        this.currState = BaseMoveGameObject.STATE_LAND;
        this.armature.play(BaseMoveGameObject.ACTION_Land, 1);
    };
    p.gotoHurtState = function () {
        this.currState = BaseMoveGameObject.STATE_HURT;
    };
    p.gotoHurt = function () {
        this.gotoHurtState();
        this.armature.play(BaseMoveGameObject.ACTION_Hart, 1);
    };
    p.command_in = function (speed, toX, toY) {
        this.isCommand = true;
        this.walkTo(speed, toX, toY);
    };
    d(p, "isInScreen"
        ,function () {
            return this.x > GameData.MIN_X && this.x < GameData.MAX_X
                && this.y > GameData.MIN_Y && this.y < GameData.MAX_Y;
        }
    );
    d(p, "isIdle"
        ,function () {
            return this.currState == BaseMoveGameObject.STATE_IDLE;
        }
    );
    d(p, "isAttack"
        ,function () {
            return this.currState == BaseMoveGameObject.STATE_ATTACK;
        }
    );
    d(p, "isMove"
        ,function () {
            return this.currState == BaseMoveGameObject.STATE_MOVE;
        }
    );
    d(p, "isJump"
        ,function () {
            return this.currState == BaseMoveGameObject.STATE_JUMP;
        }
    );
    d(p, "isLand"
        ,function () {
            return this.currState == BaseMoveGameObject.STATE_LAND;
        }
    );
    d(p, "isHurt"
        ,function () {
            return this.currState == BaseMoveGameObject.STATE_HURT;
        }
    );
    BaseMoveGameObject.STATE_IDLE = "idle";
    BaseMoveGameObject.STATE_MOVE = "move";
    BaseMoveGameObject.STATE_ATTACK = "attack";
    BaseMoveGameObject.STATE_JUMP = "jump";
    BaseMoveGameObject.STATE_LAND = "land";
    BaseMoveGameObject.STATE_HURT = "hurt";
    return BaseMoveGameObject;
}(BaseGameObject));
egret.registerClass(BaseMoveGameObject,'BaseMoveGameObject');
//# sourceMappingURL=BaseMoveGameObject.js.map