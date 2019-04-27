

window.addEventListener('load', ()=>{

  let FormEditor = new Editor("textarea");
  //let Server = new ServerRequest();

  let http1 = new HttpRequest();
  let http2 = new HttpRequest();

  // パターン1 ラップクラスの機能を使う
  http1.post("./test.php", { objname : "値", objname2 : "値"}, (data, status)=>{
    if(status){
      console.log(data);
    }
  });



 

  

});