
class HttpRequest extends XMLHttpRequest {


  static get Finished(){ return "load"; }
  static get Progress(){ return "progress"; }
  static get Error(){ return "error"; }
  static get Cancel(){ return "abort"; }

  bool_Status;




  /* -- POSTデータ送信 --
   *  第一引数 : リクエストURL
   *  第二引数 : POSTデータ
   *  第三引数 : コールバック関数
   *  第四引数 : リクエストヘッダー setRequestHeader(RequestHeader[0], RequestHeader[1])
   */
  post(url, postData, callback, RequestHeader = ['Content-Type', 'application/x-www-form-urlencoded']){

    this.connect('load', callback);
    
    this.open('POST', url, true);
    this.setRequestHeader(RequestHeader[0], RequestHeader[1]);
    
    let postParameter = "";
    for(let key in postData){
      if(!postParameter){ postParameter += key+"="+postData[key]; }
      else{ postParameter += "&"+key+"="+postData[key]; }
    }

    this.send(postParameter);
  }

  get(url, callback){
    this.connect('load', callback);
    
    this.open('GET', url, true);
    this.send();
  }




  connect(event, callback){
    this.addEventListener(event, ()=>{
      this.bool_Status = this.statusCheck();
      callback(this.responseText, this.status);
    });
  }

  /* -- ステータスをチェック --
   *　戻り値 :  ステータスをチェックし正常時はtrue
   *                             異常時はfalseを返す
   */
  statusCheck(){

    if(this.status == 200 || this.status == 304){
      return true;
    }else{
      return false;
    }

  }


}