
class Editor {
  constructor() {
    
    this._publicEditorElement       = document.getElementById("postText");
    this._publicEditorTitle         = document.getElementById("postTitle");

    // Tool buttons
    this._publicEditor_ToolButtons  = document.querySelectorAll("#Toolbar .left .groupbutton button");

    // Request buttons
    this._publicArticlePostButton = document.querySelector("#Toolbar div.right button.article");
    this._publicPreviewPostButton = document.querySelector("#Toolbar div.right button.preview");
    this._publicSavePostButton    = document.querySelector("#Toolbar div.right button.save");

    // add Table control
    this._publicEditor_TableAddControlContainer   = document.querySelector("div.tableInWidget");
    this._publicEditor_TableAddButton             = document.querySelector("div.tableInWidget button");
    this._publicEditor_TableAddInputs             = document.querySelectorAll("div.tableInWidget input");


    //ツールボタンのイベント登録
    let buttonElement = this._publicEditor_ToolButtons;
    for (let Object of buttonElement) {
      switch (Object.dataset.method) {
        case "CodeInsertion":
          //文字列挿入メソッド
          Object.addEventListener('click', () => {
            this.clickEventButton_CodeInsertion(Object);
          });
          break;
        case "TableCode":
          //テーブル挿入メソッド
          Object.addEventListener('click', () => {
            this.clickEventButton_TableCode();
          });
          break;
      } //--SWITCH END
    } //--FOR END


    // リクエストボタンのイベント登録
    this._publicArticlePostButton.addEventListener('click', this.clickEvent_ArticlePostButton.bind(this));
    //this._publicPreviewPostButton.addEventListener('load', );
    //this._publicSavePostButton.addEventListener('load', );



  }

  clickEvent_ArticlePostButton(){
    let request = new HttpRequest();
    let postTitle = this._publicEditorTitle.value;
    let postText = this._publicEditorElement.value;

    

    request.post('./test.php', { Title : postTitle, Text : postText }, (data, status)=>{
      if(status){
        console.log(data);
      }
    });
    
  
  }



  /* -- カーソルの位置を取得する --
   * 戻り値 : 構造体
   *
   * カーソルの現在位置を把握する為、
   * カーソル前後の文字列を分割して構造体で返します。
   */
  get EDITOR_CURSOR_POSITION() {
    let value = this._publicEditorElement.value;
    let length = value.length;
    let before = value.substr(0, this._publicEditorElement.selectionStart);
    let after = value.substr(this._publicEditorElement.selectionStart, length);

    //戻り値に構造体を渡す
    return { beforeCode: before, afterCode: after };
  }

  /* -- エディタ内に指定コードを挿入 --
   *  第一引数 : 挿入する文字列
   *  第二引数 : EDITOR_CURSOR_POSITION型の構造体
   */
  CodeInsertion(code, Position) {
    this._publicEditorElement.value = Position.beforeCode + code + Position.afterCode;
  }


  /* -- イベントハンドラ -- */
  clickEventButton_CodeInsertion(Object) {
    let value = Object.value;
    switch (value) {
      case "image":
        this.CodeInsertion("\n![text](url)", this.EDITOR_CURSOR_POSITION);
        break;
      case "link":
        this.CodeInsertion("\n[text](url)", this.EDITOR_CURSOR_POSITION);
        break;
      case "quote":
        this.CodeInsertion("\r\n>\r\n>\r\n>\r\n", this.EDITOR_CURSOR_POSITION);
        break;
    }

  }

  /* -- イベントハンドラ -- */
  clickEventButton_TableCode() {
    let widget  = this._publicEditor_TableAddControlContainer;
    let button  = this._publicEditor_TableAddButton;
    let input   = this._publicEditor_TableAddInputs;

    widget.style.display = "block";

    //現在のポジション情報を記憶
    const POSITION = this.EDITOR_CURSOR_POSITION;

    button.addEventListener('click', () => {


      // テンプレート
      let Cell = "     |";
      let Border = ":----|";
      let th = "";
      let line = "|";
      let code = "";

      // codeを構成する
      for (let i = 0, s = true; i < input[1].value; i++ , s = false) {
        code += "\n|";
        if (s) { th += "|"; }

        for (let l = 0; l < input[0].value; l++) {
          if (s) { line += Border; th += Cell; }
          code += Cell;
        }

        if (s) { th += "\r\n"; }
      }


      this.CodeInsertion(th + line + code, POSITION);
      widget.style.display = "none";
    })

  }

}