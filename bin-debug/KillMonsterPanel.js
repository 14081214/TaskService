var MonsterKilledPanel = (function () {
    function MonsterKilledPanel(stage, taskService) {
        this.buttonColor = 0xd6ecf0;
        this.buttonX = 20;
        this.buttonY = 600;
        this.buttonWidth = 250;
        this.buttonHeight = 50;
        this.buttonTextFieldText = " Kill a monster";
        this.buttonTextFieldX = this.buttonX + 8;
        this.buttonTextFieldY = this.buttonY + 5;
        this.buttonTextFieldWidth = 230;
        this.buttonTextFieldColor = 0x000000;
        this.monsterValue = 0;
        this.stage = stage;
        this.taskService = taskService;
        this.taskService.Attach(this, "MonsterKilledPanel");
        this.panel = new egret.DisplayObjectContainer();
        this.button = new egret.DisplayObjectContainer();
        this.buttonBack = new egret.Shape();
        this.buttonTextField = new egret.TextField();
        this.stage.addChild(this.panel);
        this.drawPanel();
    }
    var d = __define,c=MonsterKilledPanel,p=c.prototype;
    p.drawButtonBack = function () {
        this.buttonBack.graphics.beginFill(this.buttonColor, 1);
        this.buttonBack.graphics.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
        this.buttonBack.graphics.endFill();
    };
    p.setButtonText = function () {
        this.buttonTextField.fontFamily = "KaiTi";
        this.buttonTextField.text = this.buttonTextFieldText;
        this.buttonTextField.x = this.buttonTextFieldX;
        this.buttonTextField.y = this.buttonTextFieldY;
        this.buttonTextField.width = this.buttonTextFieldWidth;
        this.buttonTextField.bold = false;
        this.buttonTextField.textColor = this.buttonTextFieldColor;
    };
    p.drawButton = function () {
        this.drawButtonBack();
        this.setButtonText();
        this.button.addChild(this.buttonBack);
        this.button.addChild(this.buttonTextField);
    };
    p.drawPanel = function () {
        this.drawButton();
        this.panel.addChild(this.button);
        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    p.onButtonClick = function (e) {
        switch (this.currentTaskStatus) {
            case TaskStatus.ACCEPTABLE:
                break;
            case TaskStatus.DURING:
                this.monsterValue++;
                console.log(this.monsterValue);
                if (this.monsterValue == 10) {
                    this.taskService.canFinish(this.currentTaskId);
                }
                break;
            case TaskStatus.CAN_SUBMIT:
                this.monsterValue = 0;
                break;
            default:
        }
    };
    p.onChange = function (task) {
        this.currentTaskId = task.id;
        this.currentTaskStatus = task.status;
    };
    return MonsterKilledPanel;
}());
egret.registerClass(MonsterKilledPanel,'MonsterKilledPanel');
//# sourceMappingURL=KillMonsterPanel.js.map