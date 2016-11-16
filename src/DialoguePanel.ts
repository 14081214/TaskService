class DialoguePanel {
	panel:egret.DisplayObjectContainer;
	stage:egret.DisplayObjectContainer;

	private taskService:TaskService;
	private npc:NPC;
	private currentTaskId:string;
	private currentTaskStatus:number;

	private bgColor_Dia = 0x00FFFF;     //green
	private rectTaskPanel:egret.Shape;
	private panelX = 300;
	private panelY = 300;
	private panelWidth = 250;
	private panelHeight = 200;

	private diaNameTextField:egret.TextField;
	private diaNameText = "";
	private diaNameTextX = 45;
	private diaNameTextY = 40;
	private diaNameTextWidth = 200;
	private diaNameTexColor = 0x000000;


	private taskStateText:egret.TextField;
	private taskStateTextField = "";
	private taskStateTextX = 20;
	private taskStateTextY = 90;
	private taskStateTextWidth = 180;
	private taskStateTextColor = 0xFF0000;
	
	private button:egret.DisplayObjectContainer;
	private rectButton:egret.Shape;
	private buttonColor = 0xC0C0C0;
	private buttonX = 40;
	private buttonY = 140;
	private buttonWidth = 150;
	private buttonHeight = 45;


	private buttonTextField:egret.TextField;
	private buttonText = "OK";
	private buttonTextX = this.buttonX + 15;
	private buttonTextY = this.buttonY + 10;
	private buttonTextWidth = 180;
	private buttonTextColor = 0x000000;


	public constructor(stage:egret.DisplayObjectContainer,taskService:TaskService) {
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

	private setText(){
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


	}

	private drawTaskPanel() {
		this.rectTaskPanel.graphics.beginFill(this.bgColor_Dia,1);
		this.rectTaskPanel.graphics.drawRect(0,0,this.panelWidth,this.panelHeight);
		this.rectTaskPanel.graphics.endFill();

	}

	private drawButtonPanel() {
		this.rectButton.graphics.beginFill(this.buttonColor,1);
		this.rectButton.graphics.drawRect(this.buttonX,this.buttonY,this.buttonWidth,this.buttonHeight);
		this.rectButton.graphics.endFill();

	}

	private setButtonText() {
		this.buttonTextField.text = this.buttonText;
		this.buttonTextField.x = this.buttonTextX;
		this.buttonTextField.y = this.buttonTextY;
		this.buttonTextField.width = this.buttonTextWidth;
		this.buttonTextField.bold = false;
		this.buttonTextField.textColor = this.buttonTextColor;

	}

	private drawButton() {
		this.drawButtonPanel();
		this.rectButton.graphics.beginFill(this.buttonColor,1);
		this.rectButton.graphics.drawRect(this.buttonX,this.buttonY,this.buttonWidth,this.buttonHeight);
		this.rectButton.graphics.endFill();
		this.setButtonText();
		this.button.addChild(this.rectButton);
		this.button.addChild(this.buttonTextField);
	}

	public drawPanel() {
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
		this.button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this);

	}

	private onButtonClick(e:egret.TouchEvent) {          //按钮点击
		switch(this.currentTaskStatus){
			case TaskStatus.ACCEPTABLE:
				//console.log("Accept Button Click");
				//console.log("Current Task Id: "+ this.currentTaskId);
				this.taskService.accept(this.currentTaskId);
				break;
			case TaskStatus.CAN_SUBMIT:
				//console.log("Submit Button Click");
				this.taskService.finish(this.currentTaskId);
				break;
			default:
				//console.log("Button Click");
		}

		this.stage.removeChild(this.panel);

	} 


	public showPanel() {
		this.stage.addChild(this.panel);

	}

	public removePanel() {
		this.stage.removeChild(this.panel);

	}

	public onOpen(task:Task) {
		this.currentTaskId = task.id;
		this.changeTaskText(task.name,task.desc);
		this.changeButton(task.status);
		this.currentTaskStatus = task.status;
		this.showPanel();

	} //被通知

	private changeTaskText(name:string,desc:string) {
		this.diaNameTextField.text = name;
		this.taskStateText.text = desc;

	}

	private changeButton(taskStatus:number) {
		switch(taskStatus){
			case TaskStatus.ACCEPTABLE:
				this.buttonTextField.text = "接受任务";
				break;

			case TaskStatus.CAN_SUBMIT:
				this.buttonTextField.text = "提交任务";
				break;

			default:
				this.buttonTextField.text = "";
				break;

		}

	}
}