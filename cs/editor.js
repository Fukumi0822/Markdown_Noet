
class Editor {
  constructor() {


    this._publicElements = {
      editorInputInterface : {
        textArea : document.getElementById("postText"),
        input : {
          postTitle : document.getElementById("postTitle"),
          postLabel : document.querySelector("input[name='post_label']"),
          postSeo   : document.querySelector("input[name='post_seo_about']")
        }
      },
      editorControlInterface : {
        ControlButton : {
          addImage : document.querySelector("#Toolbar .left button[value='image']"),
          addLink  : document.querySelector("#Toolbar .left button[value='link']"),
          addTable : document.querySelector("#Toolbar .left button[value='table']"),
          addTableWidget : {
            widgetBody  : document.querySelector("div.tableInWidget"),
            input       : document.querySelectorAll("div.tableInWidget input"),
            button      : document.querySelector("div.tableInWidget button")
          },
          addQuote : document.querySelector("#Toolbar .left button[value='quote']")
        },

        RequestButton : {
          public    : document.querySelector("#Toolbar div.right button.article"),
          preview   : document.querySelector("#Toolbar div.right button.preview"),
          save      : document.querySelector("#Toolbar div.right button.save")
        }
      }
    };

    console.dir(this._publicElements);

    this._publicElements.editorControlInterface.ControlButton.addImage.addEventListener("click", ()=>{
      this.CodeInsertion("\n![text](url)", this.EDITOR_CURSOR_POSITION);
    });

    this._publicElements.editorControlInterface.ControlButton.addLink.addEventListener("click", ()=>{
      this.CodeInsertion("\n[text](url)", this.EDITOR_CURSOR_POSITION);
    });

    this._publicElements.editorControlInterface.ControlButton.addQuote.addEventListener("click", ()=>{
      this.CodeInsertion("\r\n>\r\n>\r\n>\r\n", this.EDITOR_CURSOR_POSITION);
    });

    this._publicElements.editorControlInterface.ControlButton.addTable.addEventListener("click", ()=>{
      this.clickEventButton_TableCode();
    })


    // リクエストボタンのイベント登録
    this._publicElements.editorControlInterface.RequestButton.public.addEventListener('click', this.clickEvent_ArticlePostButton.bind(this));
    //this._publicPreviewPostButton.addEventListener('load', );
    //this._publicSavePostButton.addEventListener('load', );



  }

  clickEvent_ArticlePostButton(){
    let request = new HttpRequest();
    let postTitle = this._publicElements.editorInputInterface.input.postTitle.value;
    let postText  = this._publicElements.editorInputInterface.textArea.value; 

    let postData = {
      Title : postTitle,
      Text  : postText
    }

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
    let value = this._publicElements.editorInputInterface.textArea.value;
    let length = value.length;
    let before = value.substr(0, this._publicElements.editorInputInterface.textArea.selectionStart);
    let after = value.substr(this._publicElements.editorInputInterface.textArea.selectionStart, length);

    //戻り値に構造体を渡す
    return { beforeCode: before, afterCode: after };
  }

  /* -- エディタ内に指定コードを挿入 --
   *  第一引数 : 挿入する文字列
   *  第二引数 : EDITOR_CURSOR_POSITION型の構造体
   */
  CodeInsertion(code, Position) {
    this._publicElements.editorInputInterface.textArea.value = Position.beforeCode + code + Position.afterCode;
  }


  /* -- イベントハンドラ -- */
  clickEventButton_TableCode() {
    let widget  = this._publicElements.editorControlInterface.ControlButton.addTableWidget.widgetBody;
    let button  = this._publicElements.editorControlInterface.ControlButton.addTableWidget.button;
    let input   = this._publicElements.editorControlInterface.ControlButton.addTableWidget.input;

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