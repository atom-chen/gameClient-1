/**
 * Created by yangsong on 15-1-15.
 */
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero($controller) {
        _super.call(this, $controller);
        this.attackMaxIndex = 0;
        this.attackIndex = 0;
        this.armature.register(App.DragonBonesFactory.makeArmature("zhujue1", "zhujue1", 1.4), [
            BaseGameObject.ACTION_Idle,
            BaseGameObject.ACTION_Move,
            BaseGameObject.ACTION_Hart,
            BaseGameObject.ACTION_Fly,
            BaseGameObject.ACTION_Land,
            BaseGameObject.ACTION_jump,
            Hero.ACTION_Attack0,
            Hero.ACTION_Attack1,
            Hero.ACTION_Attack2,
            Hero.ACTION_Attack3,
            Hero.ACTION_Skill1
        ]);
        this.armature.register(App.DragonBonesFactory.makeArmature("zhujue2", "zhujue2", 1.4), [
            Hero.ACTION_Skill2,
            Hero.ACTION_Skill3,
            Hero.ACTION_Skill4
        ]);
        this.armature.addCompleteCallFunc(this.armaturePlayEnd, this);
        this.initFrameData("zhujue1");
        this.effectArmature = new DragonBonesArmatureContainer();
        this.effectArmature.register(App.DragonBonesFactory.makeArmature("jineng1", "jineng1", 1.4), [
            Hero.ACTION_Attack0,
            Hero.ACTION_Attack1,
            Hero.ACTION_Attack2,
            Hero.ACTION_Attack3,
            Hero.ACTION_Skill1
        ]);
        this.effectArmature.register(App.DragonBonesFactory.makeArmature("jineng2", "jineng2", 1.4), [
            Hero.ACTION_Skill2,
            Hero.ACTION_Skill3,
            Hero.ACTION_Skill4
        ]);
    }
    var d = __define,c=Hero,p=c.prototype;
    p.init = function () {
        _super.prototype.init.call(this);
        this.isAi = false;
        this.gotoIdle();
    };
    p.destory = function () {
        _super.prototype.destory.call(this);
        this.removeEffect();
    };
    p.armaturePlayEnd = function (e, animationName) {
        if (animationName == Hero.ACTION_Attack0
            || animationName == Hero.ACTION_Attack1
            || animationName == Hero.ACTION_Attack2) {
            if (this.attackMaxIndex > this.attackIndex) {
                this.nextAttack();
            }
            else {
                this.overAttack();
            }
        }
        else if (animationName == Hero.ACTION_Attack3) {
            this.overAttack();
        }
        else if (animationName == Hero.ACTION_Skill1
            || animationName == Hero.ACTION_Skill2
            || animationName == Hero.ACTION_Skill3
            || animationName == Hero.ACTION_Skill4) {
            this.overSkill();
        }
        else if (animationName == Hero.ACTION_Hart) {
            this.gotoIdle();
        }
    };
    p.addMaxAttackIndex = function () {
        this.attackMaxIndex++;
        if (this.attackMaxIndex > 3) {
            this.attackMaxIndex = 3;
        }
    };
    p.attack = function () {
        if (this.isJump)
            return;
        if (this.isHurt)
            return;
        if (this.isLand)
            return;
        if (this.isMove) {
            this.stopMove();
        }
        this.gotoAttack();
        this.armature.play(Hero["ACTION_Attack" + this.attackIndex], 1);
        this.playEffect(Hero["ACTION_Attack" + this.attackIndex]);
        App.SoundManager.playEffect("sound_heroAttack");
    };
    p.nextAttack = function () {
        this.attackIndex++;
        this.attack();
    };
    p.overAttack = function () {
        this.attackMaxIndex = 0;
        this.attackIndex = 0;
        this.gotoIdle();
    };
    p.skill = function (id) {
        if (this.isAttack)
            return;
        if (this.isJump)
            return;
        if (this.isHurt)
            return;
        if (this.isLand)
            return;
        if (this.isMove) {
            this.stopMove();
        }
        this.gotoAttack();
        this.armature.play(Hero["ACTION_Skill" + id], 1);
        this.playEffect(Hero["ACTION_Skill" + id]);
        App.SoundManager.playEffect("sound_heroSkill");
    };
    p.overSkill = function () {
        this.gotoIdle();
    };
    p.gotoIdle = function () {
        _super.prototype.gotoIdle.call(this);
        this.removeEffect();
    };
    p.removeEffect = function () {
        this.effectArmature.stop();
        App.DisplayUtils.removeFromParent(this.effectArmature);
    };
    p.playEffect = function (actionName) {
        if (this.effectArmature.play(actionName, 1)) {
            this.addChild(this.effectArmature);
        }
        else {
            this.removeEffect();
        }
    };
    p.die = function () {
    };
    p.fly = function (attackObj, speedZ, speedX) {
        _super.prototype.fly.call(this, attackObj, speedZ, speedX);
        App.SoundManager.playEffect("sound_heroBeiji");
    };
    p.hart = function (attackObj, speed, xMoveDis) {
        _super.prototype.hart.call(this, attackObj, speed, xMoveDis);
        App.SoundManager.playEffect("sound_heroBeiji");
    };
    p.hartFly = function (attackObj, speedZ, attract) {
        _super.prototype.hartFly.call(this, attackObj, speedZ, attract);
        App.SoundManager.playEffect("sound_heroBeiji");
    };
    Hero.ACTION_Attack0 = "gongji1";
    Hero.ACTION_Attack1 = "gongji2";
    Hero.ACTION_Attack2 = "gongji3";
    Hero.ACTION_Attack3 = "gongji4";
    Hero.ACTION_Skill1 = "jineng1";
    Hero.ACTION_Skill2 = "jineng2";
    Hero.ACTION_Skill3 = "jineng3";
    Hero.ACTION_Skill4 = "jineng4";
    return Hero;
}(BaseFrameGameObject));
egret.registerClass(Hero,'Hero');
//# sourceMappingURL=Hero.js.map