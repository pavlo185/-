var htmljs_Chat_timer = new Date();
var htmljs_Chat_masgArray = {};

function web_send_msg()
{
    // РџРѕР»СѓС‡РµРЅРёРµ Р·РЅР°С‡РµРЅРёР№ РёР· СЌР»РµРјРµРЅС‚РѕРІ РІРІРѕРґР°.
    var text = $("#WebChatTextID").val();
    var name = $("#WebChatNameID").val();
    
    // РћС‡РёСЃС‚РєР° С„РѕСЂРјС‹
    $("#WebChatTextID").val("");  
    
    // Р—РїРёС€РµРј РІСЂРµРјСЏ РІ РјРѕРјРµРЅС‚ РѕС‚РїСЂР°РІРєРё СЃРѕРѕР±С‰РµРЅРёСЏ
    htmljs_Chat_timer = new Date();
    
    // Р”РѕР±Р°РІР»РµРЅРёРµ РѕС‚РїСЂР°РІР»РµРЅРЅРѕРіРѕ СЃРѕРѕР±С‰РµРЅРёСЏ Рє СЃРїРёСЃРєСѓ СЃРѕРѕР±С‰РµРЅРёР№.
    $("#WebChatFormForm").append("<p class='html-chat-msg' ><b>"+htmljs_Chat_HtmlEncode(name)+": </b>"+htmljs_Chat_HtmlEncode(text)+"</p>");

    // РџСЂРѕРєСЂСѓС‚РєР° СЃРїРёСЃРєР° СЃРѕРѕР±С‰РµРЅРёР№ РІ РЅРёР·   
    $("#WebChatFormForm").animate({ scrollTop: $("#WebChatFormForm")[0].scrollHeight}, "slow");
    
    // РСЃРїРѕР»СЊР·СѓРµРј СЃР»СѓС‡Р°Р№РЅРѕРµ С‡РёСЃР»Рѕ С‡С‚РѕР± РЅРµС‡Р°Р№РЅРѕ РЅРµ РІСЃР°РІРёС‚СЊ РґРІР° СЂР°Р·Р° РѕРґРЅРѕ Рё С‚РѕР¶Рµ СЃРѕРѕР±С‰РµРЅРёРµ
    var randomId = ""+Math.floor(Math.random()*10) + "" + (Math.random()*10) + "" + (Math.random()*10) + "" + (Math.random()*10);
    randomId = randomId.replace(/[^0-9]/img, "");
    
    htmljs_Chat_masgArray[randomId] = true;
    
    // РћС‚РїСЂР°РІРєР° СЃРѕРѕР±С‰РµРЅРёСЏ РІ РєР°РЅР°Р» С‡Р°С‚Р°
    CometServer().web_pipe_send("web_chat_pipe.msg", {"text":text, "name":name, "randomId":randomId});
    
    // РЈРІРµРґРѕРјРёРј РѕСЃС‚Р°Р»СЊРЅС‹Рµ РІРєР»Р°РґРєРё Рѕ С‚РѕРј С‡С‚Рѕ РјС‹ РґРѕР±Р°РІРёР»Рё СЃРѕРѕР±С‰РµРЅРёРµ РІ С‡Р°С‚
    comet_server_signal().send_emit("AddToChat", {"text":text, "name":name, "randomId":randomId});
}

   
// Р¤СѓРЅРєС†РёСЏ РІС‹РїРѕР»РЅРёС‚СЃСЏ РІ РїРѕСЃР»Рµ Р·Р°РіСЂСѓР·РєРё СЃС‚СЂР°РЅРёС†С‹
function htmljs_Chat_Init( holder )
{
    // РЎРѕР·РґР°РЅРёРµ С„РѕСЂРјС‹ РґР»СЏ С‡Р°С‚Р°. Р’С‘СЂСЃС‚РєР°.
    var html =  "<div class=\"holder-html-chat\" >"
	          + "<div id=\"WebChatFormForm\" class=\"html-chat-history\" ></div>"
		  + "<input type=\"text\" id=\"WebChatNameID\" class=\"html-chat-js-name\"  placeholder=\"РЈРєР°Р¶РёС‚Рµ РІР°С€Рµ РёРјСЏ...\" >"
	          + "<textarea id = \"WebChatTextID\" placeholder = \"РћС‚РїСЂР°РІСЊС‚Рµ СЃРѕРѕР±С‰РµРЅРёРµ РІ online С‡Р°С‚...\" class=\"html-chat-js-input\" ></textarea>"

                  + "<div class=\"html-chat-js-button-holder\">"
                  +    "<input type=\"button\"  onclick=\"web_send_msg();\" value=\"РћС‚РїСЂР°РІРёС‚СЊ\" >"
                  +    " <div class=\"html-chat-js-answer\"  ><a href=\"https://comet-server.com\" id=\"answer\" target='__blank' >Р Р°Р±РѕС‚Р°РµС‚ РЅР° comet-server.com</a></div>"
                  + "</div>"
             +  "</div>";
    $(holder).html(html);

    // РџРѕРґРїРёСЃС‹РІР°РµРјСЃСЏ РЅР° РєР°РЅР°Р» РІ РєРѕС‚РѕСЂС‹Р№ Рё Р±СѓРґСѓС‚ РѕС‚РїР°РІР»СЏС‚СЃСЏ СЃРѕРѕР±С‰РµРЅРёСЏ С‡Р°С‚Р°. 
    CometServer().subscription("web_chat_pipe.msg", function(msg){
        console.log(["msg", msg]);
        
        if(!msg.data.randomId)
        {
            // РЎРѕРѕР±С‰РµРЅРёРµ РєР°РєРѕРµС‚Рѕ РЅРµ РїСЂР°РІРёР»СЊРЅРѕРµ, РЅРµ РёРјРµСЋС‰РёРµ randomId
            return;
        }
        
        msg.data.randomId = ""+msg.data.randomId;
        msg.data.randomId.replace(/[^0-9]/img, "");
        
        if(htmljs_Chat_masgArray[msg.data.randomId] && !msg.data.history)
        {
            // РЎРѕРѕР±С‰РµРЅРёРµ СѓР¶Рµ РІСЃС‚Р°РІР»РµРЅРѕ
            return;
        }
        
        if(!msg.data.history)
        {
            htmljs_Chat_masgArray[msg.data.randomId] = true;
        }
        
        // Р”РѕР±Р°РІР»РµРЅРёРµ РїРѕР»СѓС‡РµРЅРѕРіРѕ СЃРѕРѕР±С‰РµРЅРёСЏ Рє СЃРїРёСЃРєСѓ СЃРѕРѕР±С‰РµРЅРёР№.
        $("#WebChatFormForm").append("<p><b>"+htmljs_Chat_HtmlEncode(msg.data.name)+": </b>"+htmljs_Chat_HtmlEncode(msg.data.text)+"</p>");
        
        // РџСЂРѕРєСЂСѓС‚РєР° СЃРїРёСЃРєР° СЃРѕРѕР±С‰РµРЅРёР№ РІ РЅРёР·   
        $("#WebChatFormForm").animate({ scrollTop: $("#WebChatFormForm")[0].scrollHeight}, "slow");
    });
    
    // РџРѕРґРїРёСЃС‹РІР°РµРјСЃСЏ РЅР° СЃРѕР±С‹С‚РёРµ РґРѕР±Р°РІР»РµРЅРёСЏ СЃРѕРѕР±С‰РµРЅРёСЏ РІ С‡Р°С‚ РЅР°РјРё, РґР»СЏ С‚РѕРіРѕ С‡С‚РѕР±С‹ РµСЃР»Рё С‡Р°С‚ РѕС‚РєСЂС‹С‚ РІ РЅРµСЃРєРѕР»СЊРєРёС… РІРєР»Р°РґРєР°С…
    // РЅР°С€Рµ СЃРѕРѕР±С‰РµРЅРёРµ РґРѕР±Р°РІР»РµРЅРѕРµ РЅР° РѕРґРЅРѕР№ РІРєР»Р°РґРєРµ РѕС‚РѕР±СЂР°Р·РёР»РѕСЃСЊ РЅР° РІСЃРµС… РѕСЃС‚Р°Р»СЊРЅС‹С… Р±РµР· РїРµСЂРµР·Р°РіСЂСѓР·РєРё СЃС‚СЂР°РЅРёС†С‹
    comet_server_signal().connect("AddToChat", function(msg){
        console.log(["msg", msg]);
        
        if(htmljs_Chat_masgArray[msg.randomId])
        {
            // РЎРѕРѕР±С‰РµРЅРёРµ СѓР¶Рµ РІСЃС‚Р°РІР»РµРЅРѕ
            return;
        }
        
        htmljs_Chat_masgArray[msg.randomId] = true;
        
        // Р”РѕР±Р°РІР»РµРЅРёРµ РїРѕР»СѓС‡РµРЅРѕРіРѕ СЃРѕРѕР±С‰РµРЅРёСЏ Рє СЃРїРёСЃРєСѓ СЃРѕРѕР±С‰РµРЅРёР№.
        $("#WebChatFormForm").append("<p><b>"+htmljs_Chat_HtmlEncode(msg.name)+": </b>"+htmljs_Chat_HtmlEncode(msg.text)+"</p>");
         
        // РџСЂРѕРєСЂСѓС‚РєР° СЃРїРёСЃРєР° СЃРѕРѕР±С‰РµРЅРёР№ РІ РЅРёР·   
        $("#WebChatFormForm").animate({ scrollTop: $("#WebChatFormForm")[0].scrollHeight}, "slow");
    });

    // РџРѕРґРїРёСЃС‹РІР°РµРјСЃСЏ РЅР° РєР°РЅР°Р» РІ РєРѕС‚РѕСЂС‹Р№ Рё Р±СѓРґСѓС‚ РѕС‚РїР°РІР»СЏС‚СЃСЏ СѓРІРµРґРѕРјР»РµРЅРёСЏ Рѕ РґРѕСЃС‚Р°РІРєРµ РѕС‚РїСЂР°РІР»РµРЅС‹С… СЃРѕРѕР±С‰РµРЅРёР№.
    CometServer().subscription("#web_chat_pipe", function(p)
    {
        // Р—РїРёС€РµРј РІСЂРµРјСЏ РІ РјРѕРјРµРЅС‚ РїРѕР»СѓС‡РµРЅРёСЏ РѕС‚С‡С‘С‚Р° Рѕ РґРѕСЃС‚Р°РІРєРµ СЃРѕРѕР±С‰РµРЅРёСЏ
        var etime = new Date();
        
        console.log(["answer_to_web_chat_pipe", p]);
        $("#answer").html("РЎРѕРѕР±С‰РµРЅРёРµ РґРѕСЃС‚Р°РІР»РµРЅРѕ "+p.data.number_messages+" РїРѕР»СѓС‡Р°С‚РµР»СЏРј Р·Р° "+ (etime.getTime() - htmljs_Chat_timer.getTime() )+"ms");
        if(p.data.error!= "") $("#answer").html(" "+p.data.error);
        
        // РџСЂРѕРєСЂСѓС‚РєР° СЃРїРёСЃРєР° СЃРѕРѕР±С‰РµРЅРёР№ РІ РЅРёР·
        $("#WebChatFormForm").animate({ scrollTop: $("#WebChatFormForm")[0].scrollHeight}, "slow");
    });
    
    CometServer().subscription("chatControl.clean", function(event){
        console.log("РњС‹ РїРѕР»СѓС‡РёР»Рё РєРѕРјР°РЅРґСѓ РѕС‡РёСЃС‚РёС‚СЊ С‡Р°С‚");
        $("#WebChatFormForm").html( '' );
        
        // РџСЂРѕРєСЂСѓС‚РєР° СЃРїРёСЃРєР° СЃРѕРѕР±С‰РµРЅРёР№ РІ РЅРёР·
        $("#WebChatFormForm").animate({ scrollTop: $("#WebChatFormForm")[0].scrollHeight}, "slow");
    });
    
    // РџСЂРѕСЃРёРј РѕС‚РїСЂР°РІРёС‚СЊ РїРѕСЃР»РµРґРЅРёРµ СЃРѕРѕР±С‰РµРЅРёСЏ РєРѕС‚РѕСЂС‹Рµ Р±С‹Р»Рё РѕС‚РїСЂР°РІР»РµРЅС‹ РІ РєР°РЅР°Р». Р­С‚Рѕ РїРѕР·РІРѕР»РёС‚ Р·Р°РіСЂСѓР·РёС‚СЊ РёСЃС‚РѕСЂРёСЋ СЃРѕРѕР±С‰РµРЅРёР№ РІ С‡Р°С‚.    
    CometServer().get_pipe_log('web_chat_pipe');
}


function htmljs_Chat_HtmlEncode(s)
{
  var el = document.createElement("div");
  el.innerText = el.textContent = s;
  s = el.innerHTML;
  return s;
}