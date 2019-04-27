

class ServerRequest{
  constructor(){

    // Button Element
    this._publicArticlePostButton = document.querySelector("#Toolbar div.right button.article");
    this._publicPreviewPostButton = document.querySelector("#Toolbar div.right button.preview");
    this._publicSavePostButton    = document.querySelector("#Toolbar div.right button.save");

    this._publicArticlePostButton.addEventListener("click", this.clickEventArticlePostButton);



  }

  



  clickEventArticlePostButton(){
    console.log("保存");
  }


}