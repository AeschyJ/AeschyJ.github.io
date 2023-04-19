var person;
function greet(){
      var x;
      person=prompt("請輸入你的名字","");
      if(person!=null && person!=""){
        x=person + "  你好 " + "! \n歡迎您來查看我的履歷！";
        alert(x);
      }
}

function light()
{
    element=document.getElementById('bulb')
    if (element.src.match("lightbulbon"))
    {
        element.src="./img/lightbulboff.svg";
        document.getElementById('body').style.backgroundColor="black";
        document.getElementById('body').style.opacity="0.7";
        document.getElementById('botbot1').style.borderColor="white";
        document.getElementById('botbot1').style.color="white";
        document.getElementById('botbot2').style.borderColor="white";
        document.getElementById('botbot2').style.color="white";
        document.getElementById('botsc').style.color="white";
    }
    else
    {
        element.src="./img/lightbulbon.svg";
        document.getElementById('body').style.backgroundColor="rgba(144, 156, 209, 0.548)";
        document.getElementById('body').style.opacity="1";
        document.getElementById('botbot1').style.borderColor="black";
        document.getElementById('botbot1').style.color="black";
        document.getElementById('botbot2').style.borderColor="black";
        document.getElementById('botbot2').style.color="black";
        document.getElementById('botsc').style.color="black";
    }
}
//宣告預設表單內容為空 （你想要的話也可以加東西）
var initSubject='',initBody='';
 
//按下傳送按鈕後執行
function submitHandler(){
    var to = "b08505030@ntu.edu.tw";//寫死的傳送對象 就是公司的信箱 不會顯示在網頁上
    var name = nameText.value;//讀取ID為 nameTextuser 物件中的值
    var email = emailText.value;
    var tel = telText.value;
    var subject = subText.value;
//把user填的資料都塞到 mail body 中
    var body = ""+bodyText.value+'%0A%0A%0A';//%0A是換行 換了三行
        body += "From："+nameText.value+'%0A';
        body += "Email："+emailText.value+'%0A';
        body += "Tel："+telText.value;
//傳送的主要程式碼
    mailTo.href="mailto:"+to+"?subject="+subject+"&body="+body;
    mailTo.click();
}
//在body onload
function init(){
    subText.value=initSubject;
    toText.value=initTo;
    bodyText.value=initBody;
}

function exp(){
    var expText = document.getElementById('exp').innerHTML;

    document.getElementById('bagr').innerHTML=expText;
    
}

function edu(){
    var eduText = document.getElementById('edu').innerHTML;

    document.getElementById('bagr').innerHTML=eduText;
}