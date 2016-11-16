var DialoguePanel = (function () {
    function DialoguePanel(stage, taskService) {
        this.bgColor_Dia = 0x00FFFF; //green
        this.panelX = 300;
        this.panelY = 300;
        this.panelWidth = 250;
        this.panelHeight = 200;
        this.diaNameText = "";
        this.diaNameTextX = 45;
        this.diaNameTextY = 40;
        this.diaNameTextWidth = 200;
        this.diaNameTexColor = 0x000000;
        this.taskStateTextField = "";
        this.taskStateTextX = 20;
        this.taskStateTextY = 90;
        this.taskStateTextWidth = 180;
        this.taskStateTextColor = 0xFF0000;
        this.buttonColor = 0xC0C0C0;
        this.buttonX = 40;
        this.buttonY = 140;
        this.buttonWidth = 180;
        this.buttonHeight = 45;
        this.buttonText = "OK";
        this.buttonTextX = this.buttonX + 15;
        this.buttonTextY = this.buttonY + 10;
        this.buttonTextWidth = 180;
        this.buttonTextColor = 0x000000;
        this.stage = stage;
        this.taskService = taskService;
        this.panel = new egret.DisplayObjectContainer();
        this.diaNameTextField = new egret.TextField();
        this.taskStateText = new egret.TextField();
        this.rectTaskPanel = new egret.Shape();
        this.button = new egret.DisplayObjectContainer();
        this.rectButton = new egret.Shape();
        this.buttonTextField = new egret.TextField();
        this.drawPanel();
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.setText = function () {
        this.diaNameTextField.text = this.diaNameText;
        this.diaNameTextField.x = this.diaNameTextX;
        this.diaNameTextField.y = this.diaNameTextY;
        this.diaNameTextField.width = this.diaNameTextWidth;
        this.diaNameTextField.bold = true;
        this.diaNameTextField.textColor = this.diaNameTexColor;
        this.taskStateText.text = this.taskStateTextField;
        this.taskStateText.x = this.taskStateTextX;
        this.taskStateText.y = this.taskStateTextY;
        this.taskStateText.width = this.taskStateTextWidth;
        this.taskStateText.bold = false;
        this.taskStateText.textColor = this.taskStateTextColor;
    };
    p.drawTaskPanel = function () {
        this.rectTaskPanel.graphics.beginFill(this.bgColor_Dia, 1);
        this.rectTaskPanel.graphics.drawRect(0, 0, this.panelWidth, this.panelHeight);
        this.rectTaskPanel.graphics.endFill();
    };
    p.drawButtonPanel = function () {
        this.rectButton.graphics.beginFill(this.buttonColor, 1);
        this.rectButton.graphics.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
        this.rectButton.graphics.endFill();
    };
    p.setButtonText = function () {
        this.buttonTextField.text = this.buttonText;
        this.buttonTextField.x = this.buttonTextX;
        this.buttonTextField.y = this.buttonTextY;
        this.buttonTextField.width = this.buttonTextWidth;
        this.buttonTextField.bold = false;
        this.buttonTextField.textColor = this.buttonTextColor;
    };
    p.drawButton = function () {
        this.drawButtonPanel();
        this.rectButton.graphics.beginFill(this.buttonColor, 1);
        this.rectButton.graphics.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
        this.rectButton.graphics.endFill();
        this.setButtonText();
        this.button.addChild(this.rectButton);
        this.button.addChild(this.buttonTextField);
    };
    p.drawPanel = function () {
        this.panel.x = this.panelX;
        this.panel.y = this.panelY;
        this.panel.width = this.panelWidth;
        this.panel.height = this.panelHeight;
        this.drawButton();
        this.drawTaskPanel();
        this.setText();
        this.panel.addChild(this.rectTaskPanel);
        this.panel.addChild(this.diaNameTextField);
        this.panel.addChild(this.taskStateText);
        this.panel.addChild(this.button);
        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    p.onButtonClick = function (e) {
        switch (this.currentTaskStatus) {
            case TaskStatus.ACCEPTABLE:
                this.taskService.accept(this.currentTaskId);
                break;
            case TaskStatus.CAN_SUBMIT:
                this.taskService.finish(this.currentTaskId);
                break;
            default:
        }
        this.stage.removeChild(this.panel);
    };
    p.showPanel = function () {
        this.stage.addChild(this.panel);
    };
    p.removePanel = function () {
        this.stage.removeChild(this.panel);
    };
    p.onOpen = function (task) {
        this.currentTaskId = task.id;
        this.changeTaskText(task.name, task.desc);
        this.changeButton(task.status);
        this.currentTaskStatus = task.status;
        this.showPanel();
    }; //被通知
    p.changeTaskText = function (name, desc) {
        this.diaNameTextField.text = name;
        this.taskStateText.text = desc;
    };
    p.changeButton = function (taskStatus) {
        switch (taskStatus) {
            case TaskStatus.ACCEPTABLE:
                this.buttonTextField.text = "accept task";
                break;
            case TaskStatus.CAN_SUBMIT:
                this.buttonTextField.text = "submit task";
                break;
            default:
                this.buttonTextField.text = "";
                break;
        }
    };
    return DialoguePanel;
}());
egret.registerClass(DialoguePanel,'DialoguePanel');
//# sourceMappingURL=DialoguePanel.js.map