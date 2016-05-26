/**
 * Created by egret on 15-1-19.
 */
var BaseAIGameObject = (function (_super) {
    __extends(BaseAIGameObject, _super);
    function BaseAIGameObject($controller) {
        _super.call(this, $controller);
        this.move_time = 3000;
        this.attack_time = 3000;
        this.ai_attack_dis = [100, 0, 30, 30, 0, 0];
    }
    var d = __define,c=BaseAIGameObject,p=c.prototype;
    p.init = function () {
        _super.prototype.init.call(this);
        this.move_time = App.RandomUtils.limitInteger(2000, 5000);
        this.attack_time = App.RandomUtils.limitInteger(2000, 4000);
        this.ai_attack_dis = [100, 0, 30, 30, 0, 0];
        this.ai_currTime = 0;
        this.isAi = true;
    };
    p.destory = function () {
        _super.prototype.destory.call(this);
    };
    p.isCanAttack = function () {
        this.attackObj = this.gameController.getMyAttackObjects(this, this.ai_attack_dis)[0];
        return this.attackObj != null;
    };
    p.update = function (time) {
        _super.prototype.update.call(this, time);
        if (!this.isAi)
            return;
        if (this.isCommand)
            return;
        var func = "state_" + this.currAiState;
        if (this.currAiState) {
            this.ai_currTime += time;
            this[func](time);
        }
    };
    p.state_ai_none = function (time) {
    };
    p.state_ai_idle = function (time) {
        if (this.isCanAttack()) {
            if (this.ai_currTime >= this.attack_time) {
                this.gotoAttack();
            }
        }
        else {
            if (this.ai_currTime >= this.move_time) {
                this.aiMove();
            }
        }
    };
    p.state_ai_move = function (time) {
        if (this.isCanAttack()) {
            this.stopMove();
            this.gotoAttack();
        }
    };
    p.state_ai_attack = function (time) {
    };
    p.gotoIdle = function () {
        _super.prototype.gotoIdle.call(this);
        if (!this.isAi)
            return;
        this.gotoAiIdle();
    };
    p.gotoMove = function () {
        _super.prototype.gotoMove.call(this);
        if (!this.isAi)
            return;
        this.gotoAiMove();
    };
    p.gotoAttack = function () {
        _super.prototype.gotoAttack.call(this);
        if (!this.isAi)
            return;
        this.gotoAiAttack();
        if (this.attackObj) {
            this.scaleX = this.attackObj.x >= this.x ? 1 : -1;
        }
    };
    p.gotoHurt = function () {
        _super.prototype.gotoHurt.call(this);
        if (!this.isAi)
            return;
        this.stopAi();
    };
    p.gotoJump = function () {
        _super.prototype.gotoJump.call(this);
        if (!this.isAi)
            return;
        this.stopAi();
    };
    p.gotoLand = function () {
        _super.prototype.gotoLand.call(this);
        if (!this.isAi)
            return;
        this.stopAi();
    };
    p.leave = function () {
        _super.prototype.leave.call(this);
        if (!this.isAi)
            return;
        this.moveRandom();
    };
    p.stopMove = function () {
        _super.prototype.stopMove.call(this);
        this.ai_currTime = this.attack_time;
    };
    p.gotoAiIdle = function () {
        this.ai_currTime = 0;
        this.currAiState = BaseAIGameObject.STATE_AI_IDLE;
    };
    p.gotoAiMove = function () {
        this.ai_currTime = 0;
        this.currAiState = BaseAIGameObject.STATE_AI_MOVE;
    };
    p.gotoAiAttack = function () {
        this.ai_currTime = 0;
        this.currAiState = BaseAIGameObject.STATE_AI_ATTACK;
    };
    p.stopAi = function () {
        this.ai_currTime = 0;
        this.currAiState = BaseAIGameObject.STATE_AI_NONE;
    };
    p.aiMove = function () {
        if (Math.random() > 0.7) {
            this.moveRandom();
        }
        else {
            this.moveToTarget();
        }
    };
    p.moveToTarget = function () {
        var target = this.gameController.getMyNearAttackObjects(this);
        var gotoX;
        var gotoY;
        if (target.isMyFront(this)) {
            gotoX = target.x + this.scaleX * App.RandomUtils.limit(0, this.ai_attack_dis[0]);
        }
        else if (target.isMyBack(this)) {
            gotoX = target.x - this.scaleX * App.RandomUtils.limit(0, this.ai_attack_dis[1]);
        }
        if (target.isMyLeft(this)) {
            gotoY = target.y - this.scaleX * App.RandomUtils.limit(0, this.ai_attack_dis[2]);
        }
        else if (target.isMyRight(this)) {
            gotoY = target.y + this.scaleX * App.RandomUtils.limit(0, this.ai_attack_dis[3]);
        }
        this.walkTo(3, gotoX, gotoY);
    };
    p.moveRandom = function () {
        var gotoX = App.RandomUtils.limit(GameData.MIN_X, GameData.MAX_X);
        var gotoY = App.RandomUtils.limit(GameData.MIN_Y, GameData.MAX_Y);
        this.walkTo(3, gotoX, gotoY);
    };
    BaseAIGameObject.STATE_AI_NONE = "ai_none";
    BaseAIGameObject.STATE_AI_IDLE = "ai_idle";
    BaseAIGameObject.STATE_AI_MOVE = "ai_move";
    BaseAIGameObject.STATE_AI_ATTACK = "ai_attack";
    return BaseAIGameObject;
}(BaseMoveGameObject));
egret.registerClass(BaseAIGameObject,'BaseAIGameObject');
//# sourceMappingURL=BaseAIGameObject.js.map