/**
 * Created by egret on 15-1-27.
 */
var BaseHitGameObject = (function (_super) {
    __extends(BaseHitGameObject, _super);
    function BaseHitGameObject($controller) {
        _super.call(this, $controller);
    }
    var d = __define,c=BaseHitGameObject,p=c.prototype;
    p.onAttack = function () {
        if (this.isAttack) {
            return false;
        }
        if (this.isMove) {
            this.stopMove();
        }
        this.stopAi();
        return true;
    };
    p.loseHp = function () {
        var isBao = Math.random() >= 0.95;
        var txt = ObjectPool.pop("egret.Bitmap");
        txt.alpha = 1;
        if (this.x < 50) {
            txt.x = this.x + App.RandomUtils.limit(0, 100);
        }
        else if (this.x > App.StageUtils.getHeight() - 50) {
            txt.x = this.x - App.RandomUtils.limit(0, 100);
        }
        else {
            txt.x = this.x + (Math.random() > 0.5 ? App.RandomUtils.limit(0, 100) : -App.RandomUtils.limit(0, 100));
        }
        txt.y = this.y + this.z - 100;
        AnchorUtil.setAnchorX(txt, 0.5);
        txt.texture = isBao ? RES.getRes("losehp_baoji_png") : RES.getRes("losehp_png");
        egret.Tween.get(txt).to({ y: this.y + this.z - 300 }, 1000, egret.Ease.backOut).to({
            alpha: 0,
            y: this.y + this.z - 400
        }, 300).call(function () {
            App.DisplayUtils.removeFromParent(txt);
            ObjectPool.push(txt);
        }, this);
        LayerManager.Game_Main.addChild(txt);
        if (isBao) {
            this.hp -= 30;
        }
        else {
            this.hp -= 10;
        }
        if (this.hp <= 0) {
            this.die();
        }
    };
    p.die = function () {
        this.isDie = true;
        if (this.z == 0) {
            this.jump(-20, 5);
            this.armature.play(BaseGameObject.ACTION_Fly, 1);
        }
    };
    p.fly = function (attackObj, speedZ, speedX) {
        if (this.onAttack()) {
            var xFlag = this.x > attackObj.x ? 1 : -1;
            this.scaleX = attackObj.isMyFront(this) ? -attackObj.scaleX : attackObj.scaleX;
            this.jump(speedZ, xFlag * speedX);
            this.armature.play(BaseGameObject.ACTION_Fly, 1);
        }
        this.loseHp();
    };
    p.hart = function (attackObj, speed, xMoveDis) {
        if (this.onAttack()) {
            this.scaleX = attackObj.isMyFront(this) ? -attackObj.scaleX : attackObj.scaleX;
            this.moveTo(speed, this.x - (this.scaleX * xMoveDis), this.y);
            this.gotoHurt();
        }
        this.loseHp();
    };
    p.hartFly = function (attackObj, speedZ, attract) {
        if (this.onAttack()) {
            if (attract) {
                this.moveTo(1, attackObj.x, attackObj.y);
                this.moveToZ(speedZ);
            }
            else {
                this.moveToZ(speedZ);
            }
            if (this.z == 0) {
                this.scaleX = attackObj.isMyFront(this) ? -attackObj.scaleX : attackObj.scaleX;
                this.armature.play(BaseGameObject.ACTION_Fly, 1);
                this.gotoHurtState();
            }
        }
        this.loseHp();
    };
    return BaseHitGameObject;
}(BaseAIGameObject));
egret.registerClass(BaseHitGameObject,'BaseHitGameObject');
//# sourceMappingURL=BaseHitGameObject.js.map