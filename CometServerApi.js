/**
 * JavaScript API for comet-server.com
 * I will be glad to new orders for something a development.
 *
 * Version 4.09
 *
 *
 * @author Trapenok Victor, Levhav@ya.ru, 89244269357
 *
 * Levhav@ya.ru
 * Skype:Levhav
 * 89244269357
 * @link http://comet-server.com
 *
 * (Т‚`_Вґ)
 * <,пё»в•¦в•¤в”Ђ Т‰ - - - - - - --
 * _/п№‹\_
 *
 */

if( !window._tabSignal)
{
    var _tabSignal = function(opt)
    {
        this.slotArray = new Array();
        this.debug = false;

        this.sigId = 0;


        this.tabUUID = undefined;
        this.getTabUUID = function()
        {
            if(!this.tabUUID)
            {
                this.tabUUID = "";
                for(var i = 0; i< 16; i++)
                {
                    this.tabUUID += "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM"[Math.floor(Math.random()*62)];
                }
            }
            return this.tabUUID;
        };

        this.eventKey = this.getTabUUID();
        if(opt && opt.eventKey)
        {
            this.eventKey = opt.eventKey
        }

        this.setEventKey = function(key)
        {
            this.eventKey = key
        }

        this.getEventKey = function()
        {
            return this.eventKey
        }

        /**
         * РџРѕРґРїРёСЃС‹РІР°РµС‚ СЃР»РѕС‚ РЅР° СЃРёРіРЅР°Р»
         *
         * Р•СЃР»Рё РїРµСЂРµРґР°С‚СЊ РґРІР° РїР°СЂР°РјРµС‚СЂР° С‚Рѕ РѕРЅРё РѕР±СЂР°Р±РѕС‚Р°СЋС‚СЃСЏ РєР°Рє  connect( signal_name, slot_function )
         * Р•СЃР»Рё РїРµСЂРµРґР°С‚СЊ С‚СЂРё РїР°СЂР°РјРµС‚СЂР° С‚Рѕ РѕРЅРё РѕР±СЂР°Р±РѕС‚Р°СЋС‚СЃСЏ РєР°Рє  connect( slot_name, signal_name, slot_function )
         *
         * @param slot_name РРјСЏ СЃР»РѕС‚Р°
         * @param signal_name РРјСЏ СЃРёРіРЅР°Р»Р°
         * @param slot_function Р¤СѓРЅРєС†РёСЏ РІС‹Р·РІР°РµРјР°СЏ РїСЂРё РІС‹Р·РѕРІРµ СЃР»РѕС‚Р°, РґРѕР»Р¶РЅР° РёРјРµС‚СЊ СЃР»РµРґСѓСЋС‰РёСЋ СЃРёРіРЅР°С‚СѓСЂСѓ function(param, signal_name){}
         *
         * <code>
         * РџСЂРёРјРµСЂ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ
         * new new signal().emit("catalogControl.OpenObject",{})
         *
         * </code>
         */
        this.connect = function(slot_name, signal_name, slot_function)
        {
            if(slot_function === undefined)
            {
                slot_function = signal_name;
                signal_name = slot_name;
                slot_name = "sig" + (this.sigId++)
            }

            if (this.slotArray[signal_name] === undefined)
            {
                this.slotArray[signal_name] = {}
            }
            this.slotArray[signal_name][slot_name] = slot_function;
            if(this.debug) console.log("[js-api] РќР° РїСЂРѕСЃР»СѓС€РёРІР°РЅРёРµ СЃРёРіРЅР°Р»Р° " + signal_name + " РґРѕР±Р°РІР»РµРЅ СЃР»РѕС‚ " + slot_name + "", this.slotArray);
            return slot_name;
        };


        /**
         * РћС‚РїРёСЃС‹РІР°РµС‚ СЃР»РѕС‚ slot_name РѕС‚ СЃРёРіРЅР°Р»Р° signal_name
         */
        this.disconnect = function(slot_name, signal_name)
        {
            if (this.slotArray[signal_name] !== undefined)
            {
                if (this.slotArray[signal_name][slot_name] !== undefined)
                {
                    this.slotArray[signal_name][slot_name] = undefined;
                    return true
                }
            }
            return false
        };

        /**
         * Р’С‹Р·С‹РІР°РµС‚ СЃР»РѕС‚С‹ РїРѕРґРїРёСЃР°РЅС‹Рµ РЅР° СЃРёРіРЅР°Р» signal_name Рё РєР°Р¶РґРѕРјСѓ РёР· РЅРёС… РїРµСЂРµРґР°С‘С‚ Р°СЂСѓРјРµС‚С‹ signal_name - РёРјСЏ РІС‹Р·РІР°РІС€РµРіРѕ СЃРёРіРЅР°Р»Р°, Рё param - РѕР±СЉРµРєС‚ СЃ РїР°СЂР°РјРµС‚СЂР°РјРё РґР»СЏ СЃР»РѕС‚Р°)
         * Р’ РґРѕР±Р°РІРѕРє СЂРµС‚СЂР°РЅСЃР»РёСЂСѓРµС‚ СЃРёРіРЅР°Р» РІ РґРѕС‡РµСЂРЅРёРё iframe РµСЃР»Рё РѕРЅРё РµСЃС‚СЊ Рё РІ СЂРѕРґРёС‚РµР»СЊСЃРєРѕРµ РѕРєРЅРѕ РµСЃР»Рё РѕРЅРѕ РµСЃС‚СЊ
         * @param signal_name РРјСЏ СЃРёРіРЅР°Р»Р°
         * @param param РџР°СЂР°РјРµС‚СЂС‹ РїРµСЂРµРґР°РЅС‹Рµ СЃР»РѕС‚Сѓ РїСЂРё РІС‹Р·РѕРІРµ РІ РІС‚РѕСЂРѕРј Р°СЂРіСѓРјРµРЅС‚Рµ
         * @param SignalNotFromThisTab Р•СЃР»Рё false С‚Рѕ Р·РЅР°С‡РёС‚ СЌС‚Рѕ СЃРёРіРЅР°Р» РїСЂРёС€С‘Р» РёР· РґСЂСѓРіРѕР№ РІРєР»Р°РґРєРё
         */
        this.emit = function(signal_name, param, SignalNotFromThisTab)
        {
            //console.log("[js-api] emit:" + signal_name, param)
            if (this.slotArray[signal_name] === undefined)
            {
                if(this.debug) console.log("[js-api] РќР° СЃРёРіРЅР°Р» " + signal_name + " РЅРµС‚ РїРѕРґРїРёСЃС‡РёРєРѕРІ")
            }
            else
            {
                if(this.debug) console.log("[js-api] РЎРёРіРЅР°Р» " + signal_name + " РїРѕРґРїРёСЃР°РЅС‹ СЃР»РѕС‚С‹");
                var obj = this.slotArray[signal_name];
                for (var slot in obj)
                {
                    if( obj.hasOwnProperty(slot) &&  obj[slot] !== undefined)
                    {
                        obj[slot](param,signal_name, SignalNotFromThisTab === true)
                    }
                }

            }
        };

        /*
         *  РіРµРЅРµСЂР°С†РёСЏ СЃРѕР±С‹С‚РёСЏ Р±СѓРґСѓС‚ РѕРїРѕРІРµС‰РµРЅС‹ Рё СЃРѕСЃРµРґРЅРёРµ РІРєР»Р°РґРєРё
         *  @eName string - РёРјСЏ СЃРѕР±С‹С‚РёСЏ
         *  РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ .emit('Р»СЋР±РѕРµ РЅР°Р·РІР°РЅРёРµ СЃРѕР±С‹С‚РёСЏ', [ РџР°СЂР°РјРµС‚СЂС‹ СЃРѕР±С‹С‚РёСЏ ])
         */
        this.emitAll = function (signal_name, param)
        {
            this.emit(signal_name, param);

            try{
                if(window['localStorage'] !==undefined  )
                {
                    var curent_custom_id = Math.random()+"_"+Math.random()+"_"+Math.random()+"_"+Math.random()+"_"+Math.random();
                    window['localStorage'][this.eventKey]= JSON.stringify({name:signal_name, custom_id:curent_custom_id, param:param});
                }
                return true
            }catch (e){
                return false
            }
        };

        /**
         * Р—Р°РїРёСЃСЊ СЃРѕСЃС‚РѕСЏРЅРёСЏ РѕР±С‰РµРіРѕ РґР»СЏ РІСЃРµС… РІРєР»Р°РґРѕРє
         * @param {string} name
         * @param {object} value
         * @param {number} minTime РјРёРЅРёРјР°Р»СЊРЅС‹Р№ РІРѕР·СЂР°СЃС‚ РґР°РЅРЅС‹С… РјРµРЅСЊС€Рµ РєРѕС‚РѕСЂРѕРіРѕ РґР°РЅРЅС‹Рµ РїРµСЂРµР·Р°РїРёСЃРІР°С‚СЃСЏ РЅРµ РґРѕР»Р¶РЅС‹ РІ С‚РѕРј СЃР»СѓС‡Р°РёРё РµСЃР»Рё РѕРЅРё Р·Р°РїРёСЃР°РЅРЅС‹ РЅРµ СЌС‚РѕР№ РІРєР»Р°РґРєРѕР№
         */
        this.setState = function(name, value, minTime)
        {
            if(!this._states)
            {
                this._states = {}
            }

            var time = new Date();
            try{
                if(minTime)
                {
                    var value = window.localStorage["tabSignal_"+this.eventKey+name];
                    if(value)
                    {
                        var val = JSON.parse(value);

                        if(val.time + minTime > time.getTime() && val.tabUUID != this.getTabUUID() )
                        {
                            // Р’РѕР·СЂР°СЃС‚ РґР°РЅРЅС‹С… РјРµРЅСЊС€Рµ minTime Рё РѕРЅРё Р·Р°РїРёСЃР°РЅС‹ РЅРµ СЌС‚РѕР№ РІРєР»Р°РґРєРѕР№, Р° Р·РЅР°С‡РёС‚ РјС‹ РёС… РїРµСЂРµР·Р°РїРёСЃС‹РІР°С‚СЊ РЅРµ Р±СѓРґРµРј
                            return false
                        }
                    }
                }

                window.localStorage["tabSignal_"+this.eventKey+name] = JSON.stringify({time: time.getTime(), value: value, tabUUID: this.getTabUUID()});
                return true
            }catch (e)
            {
                if(minTime)
                {
                    var value = this._states["tabSignal_"+this.eventKey+name];
                    if(value)
                    {
                        var val = JSON.parse(value);

                        if(val.time + minTime > time.getTime() && val.tabUUID != this.getTabUUID() )
                        {
                            // Р’РѕР·СЂР°СЃС‚ РґР°РЅРЅС‹С… РјРµРЅСЊС€Рµ minTime Рё РѕРЅРё Р·Р°РїРёСЃР°РЅС‹ РЅРµ СЌС‚РѕР№ РІРєР»Р°РґРєРѕР№, Р° Р·РЅР°С‡РёС‚ РјС‹ РёС… РїРµСЂРµР·Р°РїРёСЃС‹РІР°С‚СЊ РЅРµ Р±СѓРґРµРј
                            return false
                        }
                    }
                }

                this._states["tabSignal_"+this.eventKey+name] = JSON.stringify({time: time.getTime(), value: value, tabUUID: this.getTabUUID()});
                return true
            }
        };

        /**
         * РћР±РЅРѕРІР»РµРЅРёРµ СЃ РёРЅС‚РµСЂРІР°Р»РѕРј РґР°РЅРЅС‹С… С‡С‚РѕР± РёС… РЅРµ РїРµСЂРµР·Р°РїРёСЃР°Р»Р° РґСЂСѓРіР°СЏ РІРєР»Р°РґРєР°
         * @param {type} name
         * @param {type} value
         * @param {type} minTime
         * @return {undefined}
         */
        this.intervalUpdateState = function(name, value, minTime)
        {
            var thisObj = this;
            if(thisObj.setState(name, value, minTime))
            {
                return setInterval(function(){
                    thisObj.setState(name, value, minTime)
                }, minTime/3, name, value, minTime)
            }
            return undefined
        };
        /**
         * Р§С‚РµРЅРёРµ СЃРѕСЃС‚РѕСЏРЅРёСЏ РѕР±С‰РµРіРѕ РґР»СЏ РІСЃРµС… РІРєР»Р°РґРѕРє
         * @param {string} name
         * @param {number} maxTime РњР°РєСЃРёРјР°Р»СЊРЅС‹Р№ РІРѕР·СЂР°СЃС‚ РґР°РЅРЅС‹С… РІ РјРёР»РµСЃРµРєСѓРЅРґР°С… РїРѕСЃР»Рµ С‡РµРіРѕ РѕРЅРё СЃС‡РёС‚Р°СЋС‚СЃСЏ РЅРµ РґРµР№СЃС‚РІРёС‚РµР»СЊРЅС‹РјРё.
         * @return {Window.localStorage}
         */
        this.getState = function(name, maxTime)
        {
            if(!this._states)
            {
                this._states = {}
            }

            try{
                var time = new Date();
                var value = window.localStorage["tabSignal_"+this.eventKey+name];
                if(value)
                {
                    var val = JSON.parse(value);

                    if(!maxTime)
                    {
                        // РќР°Рј РЅРµ РІР°Р¶РµРЅ РІРѕР·СЂР°СЃС‚ РґР°РЅРЅС‹С…
                        return val.value
                    }

                    if(val.time + maxTime > time.getTime())
                    {
                        // Р’РѕР·СЂР°СЃС‚ РґР°РЅРЅС‹С… РјРµРЅСЊС€Рµ maxTime
                        return val.value
                    }
                    return undefined
                }
            }catch (e){

                var time = new Date();
                var value = this._states["tabSignal_"+this.eventKey+name];
                if(value)
                {
                    var val = JSON.parse(value);

                    if(!maxTime)
                    {
                        // РќР°Рј РЅРµ РІР°Р¶РµРЅ РІРѕР·СЂР°СЃС‚ РґР°РЅРЅС‹С…
                        return val.value
                    }

                    if(val.time + maxTime > time.getTime())
                    {
                        // Р’РѕР·СЂР°СЃС‚ РґР°РЅРЅС‹С… РјРµРЅСЊС€Рµ maxTime
                        return val.value
                    }
                    return undefined
                }
            }
            return undefined
        };

        this.send_emit = this.emit/*All*/; // Р”Р»СЏ СЃРѕРІРјРµСЃС‚РёРјРѕСЃС‚Рё СЃ РїСЂРѕС€Р»РѕР№ РІРµСЂСЃРёРµР№.

        var thisTabSignalObj = this;
        this.init = true;
        if( window.addEventListener )
        {
            window.addEventListener('storage', function(e)
            {
                if(e.key && e.key == thisTabSignalObj.eventKey)
                {// !testThis
                    try{
                        var data = JSON.parse(e.newValue);
                        if(data !== undefined && data.name !== undefined  )
                        {
                            if(thisTabSignalObj.debug > 1) console.log( data );
                            thisTabSignalObj.emit( data.name, data.param, true )
                        }
                    }
                    catch (failed)
                    {
                    }
                }
            }, false);
        }
        else if( document.attachEvent )
        {
            document.attachEvent('onstorage', function(e)
            {
                if(e.key && e.key == thisTabSignalObj.eventKey)
                {// !testThis
                    try{
                        var data = JSON.parse(e.newValue);
                        if(data !== undefined && data.name !== undefined  )
                        {
                            if(thisTabSignalObj.debug > 1) console.log( data );
                            thisTabSignalObj.emit( data.name, data.param, true )
                        }
                    }
                    catch (failed)
                    {
                    }
                }
            });
        }
    }

}

if( !window.tabSignal)
{
    window.tabSignal = new _tabSignal({eventKey:'tabSignal_storage_emit'});
}

window.comet_server_signal = function(){ return window.tabSignal}

var _cometServerApi = function(opt)
{
    if(opt)
    {
        if(this.options === undefined)
        {
            this.options = {};
        }

        for(var key in opt)
        {
            this.options[key] = opt[key];
        }
    }

    /**
     * @private
     */
    this.version = "4.09";

    /**
     * @private
     */
    this.options = {};

    this.tabSignal = new _tabSignal();

    /**
     * @private
     */
    this.options.nodeArray = ["app.comet-server.ru"];
    this.options.node = undefined;

    /**
     * Р РµР¶РёРј РєР»Р°СЃС‚РµСЂРёР·Р°С†РёРё
     * @type Boolean
     *
     * True - РїРѕРґРєР»СЋС‡Р°РµРјСЃСЏ Рє РѕРґРЅРѕР№ РЅРѕРґРµ, РµСЃР»Рё РЅРµ Р°РІС‚РѕСЂРёР·РѕРІР°РЅС‹ С‚Рѕ Рє СЃР»СѓС‡Р°Р№РЅРѕР№, РµСЃР»Рё Р°РІС‚РѕСЂРёР·РѕРІР°РЅС‹ С‚Рѕ РІС‹Р±РёСЂР°РµРј РЅР° РѕСЃРЅРѕРІРµ user_id
     * False - РїРѕРґРєР»СЋС‡Р°РµРјСЃСЏ РєРѕ РІСЃРµРј РЅРѕРґР°Рј РёР· СЃРїРёСЃРєР°, РѕС‚РїСЂР°РІР»СЏРµРј СЃРѕРѕР±С‰РµРЅРёСЏ РЅР° РѕРґРЅСѓ РЅРѕРґСѓ РёР· СЃРїРёСЃРєР°
     */
    this.options.roundrobin = false;

    /**
     * @private
     */
    this.is_master = undefined;


    /**
     * РџСЂРµС„РёРєСЃ РґР»СЏ РѕР±РјРµРЅР° РґР°РЅРЅС‹РјРё РІ СЂР°РјРєР°С… localstorage
     * @private
     */
    this.instance_id = undefined;

    /**
     * @private
     */
    //this.in_conect_to_server = false;

    /**
     * @private
     */
    this.in_try_conect = false;

    /**
     * РњР°СЃСЃРёРІ РёРјС‘РЅ РєР°РЅР°Р»РѕРІ РЅР° РєРѕС‚РѕСЂС‹Рµ РјС‹ РїРѕРґРїРёСЃР°РЅС‹
     * @private
     */
    this.subscription_array = new Array();

    /**
     * РЎР»СѓС‡Р°Р№РЅС‹Р№ РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ РІРєР»Р°РґРєРё.
     * РСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ РґР»СЏ РѕРїСЂРµРґРµР»РµРЅРёСЏ РєРѕРјСѓ РїСЂРµРґРЅР°Р·РЅР°С‡РµРЅС‹ РёСЃС‚РѕСЂРёС‡РµСЃРєРёРµ РґР°РЅРЅС‹Рµ РёР· РєР°РЅР°Р»Р°.
     * @private
     */
    this.custom_id = (Math.random()*10)+""+Math.random();
    this.custom_id = this.custom_id.replace(/[^0-9A-z]/,"").replace(/^(.{10}).*$/,"$1");


    /**
     * Р’СЂРµРјСЏ РЅР° РїРµСЂРµРїРѕРґРєР»СЋС‡РµРЅРёРµ РІ РјРёР»РёСЃРµРєСѓРЅРґР°С… РїРѕСЃР»Рµ РІС‚РѕСЂРѕР№ РїРѕРґСЂСЏРґ РѕС€РёР±РєРё РїРѕРґРєР»СЋС‡РµРЅРёСЏ
     * @private
     */
    this.time_to_reconect_on_error = [];

    /**
     * Р’СЂРµРјСЏ РЅР° РїРµСЂРµРїРѕРґРєР»СЋС‡РµРЅРёРµ РІ РјРёР»РёСЃРµРєСѓРЅРґР°С… РїРѕСЃР»Рµ РїРµСЂРІРѕР№ РѕС€РёР±РєРё РїРѕРґРєР»СЋС‡РµРЅРёСЏ
     * @private
     */
    this.time_to_reconect_on_close = [];

    /**
     * @private
     */
    this.in_abort = false;

    /**
     * @private
     */
    this.restart_time_id = false;

    /**
     * Р’СЂРµРјСЏ РґР°РІР°РµРјРѕРµ РЅР° РѕРїСЂРµРґРµР»РµРЅРёРµ С‚РѕРіРѕ РєР°РєР°СЏ РёР· РІРєР»Р°РґРѕРє СЏРІР»СЏРµС‚СЃСЏ РјР°СЃС‚РµСЂРІРєР»Р°РґРєРѕР№
     * @private
     */
    this.start_timer = 1200;

    /**
     * Р’С‹СЂР°Р¶РµРЅРёРµ РѕС‚РґРµР»СЏСЋС‰РёРµ РїРѕ Р·РЅР°РєСѓ С‚РѕС‡РєРё РЅР° РїР°РІСѓСЋ Рё Р»РµРІСѓСЋ С‡Р°СЃС‚Рё.
     * @private
     */
    this.reg_exp = new RegExp(/^([^.]+)\.([^.]+)$/);

    /**
     * РћРїСЂРµРґРµР»СЏРµС‚ РЅР°РґРѕ Р»Рё РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ https РёР»Рё http
     * @private
     */
    this.protocol = "";
    if(document.location)
    {
        this.protocol = window.location.protocol.replace(/[^s]/img, "")
    }

    /**
     * @private
     */
    this.web_socket_error = [];

    /**
     * @private
     */
    this.isSendStatisticsData = [];
    /**
     * РЈС‡РёС‚С‹РІР°РµС‚ СѓРґР°С‡РЅРѕ РїРµСЂРµРґР°РЅРЅС‹Рµ СЃРѕРѕР±С‰РµРЅРёСЏ РїРѕ РІРµР±СЃРєРѕРєРµС‚Сѓ
     * Р•СЃР»Рё РѕРЅРё Р±С‹Р»Рё С‚Рѕ РІ СЃР»СѓС‡Р°РёРё РЅРµРїРѕР»Р°РґРѕРє СЃ СЃСЃРµС‚СЊСЋ РїРµСЂРµС…РѕРґ РЅР° long poling РѕСЃСѓС‰РµСЃС‚РІР»С‘РЅ РЅРµ Р±СѓРґРµС‚.
     * @private
     */
    this.web_socket_success = false;

    /**
     * @private
     */
    this.web_socket_error_timeOut = 30000;

    /**
     * @private
     */
    this.xhr_error = 0;
    /**
     * @private
     */
    this.xhr_error_timeOut_id = 30000;

    /**
     * @private
     */
    this.authorized_status;

    /**
     * @private
     */
    this.socket;
    this.socketArray = [];

    /**
     * @private
     */
    this.use_WebSocket;

    /**
     * @private
     */
    this.request;

    /**
     * @private
     */
    this.status;

    /**
     * @private
     */
    this.send_msg_queue = [];

    /**
     * СЃРѕРґРµСЂР¶РёС‚ РїР°РєРµС‚ РґР°РЅРЅС‹С… Рѕ РїРѕРґРїРёСЃРєР°С… РіРѕС‚РѕРІС‹Р№ Рє РѕС‚РїСЂР°РІРєРµ РїРѕ РІРµР±СЃРѕРєРµС‚Сѓ
     * @private
     * @type {string}
     */
    this.send_msg_subscription = false;

    /**
     * РЈСЂРѕРІРµРЅСЊ Р»РѕРіРёСЂРѕРІР°РЅРёСЏ
     * @private
     */
    this.LogLevel = 0;

    /**
     * РЎРїРёСЃРѕРє СѓРЅРёРєР°Р»СЊРЅС‹С… РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂРѕРІ СЃРѕРѕР±С‰РµРЅРёР№ РєРѕС‚РѕСЂС‹Рµ Р±С‹Р»Рё РїСЂРёРЅСЏС‚С‹
     * РСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ С‡С‚РѕР± РіР°СЂР°РЅС‚РёСЂРѕРІР°С‚СЊ РѕС‚СЃСѓС‚СЃРІРёРµ РґСѓР±Р»РµР№
     * @type object
     */
    this.msgsUUIDs = {};

    try{
        if(window['localStorage']['comet_LogLevel'])
        {
            this.LogLevel = window['localStorage']['comet_LogLevel']/1
        }
    }catch (e){}

    this.getLogLevel = function()
    {
        return this.LogLevel;
    };

    this.setLogLevel = function(level)
    {
        this.LogLevel = level;
        try{
            window['localStorage']['comet_LogLevel'] = level;
        }catch (e){}
    };

    /**
     * @return {String} РЎРґСѓС‡Р°Р№РЅР°СЏ СЃС‚СЂРѕРєР° СЂРѕРІРЅРѕ РёР· 10 СЃРёРјРІРѕР»РѕРІ
     */
    this.getCustomString = function()
    {
        var custom = (Math.random()*10)+""+Math.random();
        return custom.replace(/[^0-9A-z]/,"").replace(/^(.{10}).*$/,"$1");
    };

    /**
     * @return {string} РЈРЅРёРєР°Р»СЊРЅС‹Р№ ( СЃ Р±РѕР»СЊС€РѕР№ РґРѕР»РµР№ РІРµСЂРѕСЏС‚РЅРѕСЃС‚Рё ) РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ РІРєР»Р°РґРєРё
     */
    this.getTabUUID = function()
    {
        return this.tabSignal.getTabUUID()
    };

    /**
     *  http://www.webtoolkit.info/
     **/
    this.Base64 = {
        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < input.length; n++)
            {
                var c = input.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }

            while (i < utftext.length) {

                chr1 = utftext.charCodeAt(i++);
                chr2 = utftext.charCodeAt(i++);
                chr3 = utftext.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                        enc4 = 64;
                }
                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }
            return output;
        },

        decode : function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while ( i < output.length ) {

                c = output.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if((c > 191) && (c < 224)) {
                    c2 = output.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = output.charCodeAt(i+1);
                    c3 = output.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        }
    };

    this.stripslashes = function(str)
    {
        //       discuss at: http://phpjs.org/functions/stripslashes/
        //      original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //      improved by: Ates Goral (http://magnetiq.com)
        //      improved by: marrtins
        //      improved by: rezna
        //         fixed by: Mick@el
        //      bugfixed by: Onno Marsman
        //      bugfixed by: Brett Zamir (http://brett-zamir.me)
        //         input by: Rick Waldron
        //         input by: Brant Messenger (http://www.brantmessenger.com/)
        // reimplemented by: Brett Zamir (http://brett-zamir.me)
        //        example 1: stripslashes('Kevin\'s code');
        //        returns 1: "Kevin's code"
        //        example 2: stripslashes('Kevin\\\'s code');
        //        returns 2: "Kevin\'s code"

        return (str + '')
            .replace(/\\(.?)/g, function(s, n1) {
                switch (n1) {
                    case '\\':
                        return '\\';
                    case '0':
                        return '\u0000';
                    case '':
                        return '';
                    default:
                        return n1;
                }
            });
    };
    /**
     * Р’С‹РїРѕР»РЅСЏРµС‚ РїСЂРёРІСЏР·РєСѓ callBack С„СѓРЅРєС†РёРё Рє СЃРѕР±С‹С‚РёСЋ.
     * Р РїСЂРё РїСЂРѕРёСЃС€РµСЃС‚РІРёРё СЃРѕР±С‹С‚РёСЏ РЅР° РєРѕС‚РѕСЂРѕРµ РјС‹ РїРѕРґРїРёСЃС‹РІР°Р»РёСЃСЊ РІ С„СѓРЅРєС†РёРё subscription
     * РѕРїСЂРµРґРµР»СЏРµС‚ РЅР°РґРѕ Р»Рё РґС‘СЂРіР°С‚СЊ callBack С„СѓРЅРєС†РёСЋ С‚Р°Рє РєР°Рє РµСЃР»Рё СЃРѕР±С‹С‚РёРµ Р°РґСЂРµСЃРѕРІР°РЅРѕ
     * РґСЂСѓРіРѕР№ РІРєР»Р°РґРєРµ С‚Рѕ РґС‘СЂРіР°С‚СЊ РЅРµ РЅР°РґРѕ.
     *
     * @private
     * @param {string} name РРјСЏ РєР°РЅР°Р»Р°
     * @param {function} callBack
     * @param {string} specialMarker Р•СЃР»Рё РїРµСЂРµРґР°С‚СЊ РЅРµ undefined С‚Рѕ РїРѕСЃР»Рµ РїСЂРёС…РѕРґР°
     * СЃРѕР±С‹С‚РёСЏ РїСЂРѕРёР·РѕР№РґС‘С‚ РѕС‚РїРёСЃРєР° Рё РєРѕР» Р±РµРє Р±СѓРґРµС‚ РЅР°РІРµС€Р°РЅ С‚РѕР»СЊРєРѕ РЅР° РєРѕРЅРєСЂРµС‚РЅРѕ РЅР°С€ РѕС‚РІРµС‚.
     * @return string РРјСЏ СЃРёРіРЅР°Р»Р°, РјРѕР¶РµС‚ РїРѕРЅР°РґРѕР±РёС‚СЃСЏ РґР»СЏ С‚РѕРіРѕ С‡С‚РѕР±С‹ РѕС‚РїРёСЃР°С‚СЃСЏ РѕС‚ СЃРѕРѕР±С‰РµРЅРёР№.
     */
    this.subscription_callBack = function(name, callBack, specialMarker)
    {
        var thisObj = this;
        var sigId = name+"&&";
        if(specialMarker === undefined)
        {
            // РџРѕРґРїРёСЃРєР° РЅР° СЃРѕРѕР±С‰РµРЅРёСЏ РѕС‚ СЃРµСЂРІРµСЂР° РґР»СЏ РЅР°С€РµР№ РІРєР»Р°РґРєРё
            sigId += thisObj.tabSignal.connect(name, function(param)
            {
                //console.log("[js-api] marker", param.server_info.marker, thisObj.custom_id)
                if(param.server_info.marker !== thisObj.custom_id && param.server_info.marker !== undefined)
                {
                    // Р”Р°РЅРЅРѕРµ СЃРѕРѕР±С‰РµРЅРёРµ РїСЂРµРґРЅРѕР·РЅР°С‡РµРЅРѕ РЅРµ СЌС‚РѕР№ РІРєР»Р°РґРєРµ.
                    return 0;
                }
                callBack(param);
            });
        }
        else
        {
            // РџРѕРґРїРёСЃРєР° РЅР° СЃРѕРѕР±С‰РµРЅРёСЏ РѕС‚ СЃРµСЂРІРµСЂР° РґРѕСЃС‚Р°РІР»РµРЅС‹Рµ СЃРїРµС†РёР°Р»СЊРЅРѕ Рё РµРґРёРЅРѕСЂР°Р·РѕРІРѕ РґР»СЏ РїРµСЂРµРґР°РЅРЅРѕРіРѕ callBack
            sigId += thisObj.tabSignal.connect(specialMarker, name,  function(param)
            {
                if(param.server_info.marker !== specialMarker)
                {
                    // Р”Р°РЅРЅРѕРµ СЃРѕРѕР±С‰РµРЅРёРµ РїСЂРµРґРЅРѕР·РЅР°С‡РµРЅРѕ РЅРµ СЌС‚РѕР№ РІРєР»Р°РґРєРµ.
                    return 0;
                }

                thisObj.tabSignal.disconnect(specialMarker, name);
                callBack(param);
            });
        }
        return sigId;
    };

    /**
     * Р’С‹РїРѕР»РЅСЏРµС‚ РїСЂРёРІСЏР·РєСѓ callBack С„СѓРЅРєС†РёРё Рє СЃРѕР±С‹С‚РёСЋ РїРѕ СѓРЅРёРєР°Р»СЊРЅРѕРјСѓ РјР°СЂРєРµСЂСѓ РїРѕСЃР»Рµ РїСЂРёС…РѕРґР°
     * СЃРѕР±С‹С‚РёСЏ РїСЂРѕРёР·РѕР№РґС‘С‚ РѕС‚РїРёСЃРєР° Рё РєРѕР» Р±РµРє Р±СѓРґРµС‚ РЅР°РІРµС€Р°РЅ С‚РѕР»СЊРєРѕ РЅР° РєРѕРЅРєСЂРµС‚РЅРѕ РЅР°С€ РѕС‚РІРµС‚.
     *
     * @private
     * @param {string} specialMarker
     * @param {function} callBack
     * @return string РРјСЏ СЃРёРіРЅР°Р»Р°, РјРѕР¶РµС‚ РїРѕРЅР°РґРѕР±РёС‚СЃСЏ РґР»СЏ С‚РѕРіРѕ С‡С‚РѕР±С‹ РѕС‚РїРёСЃР°С‚СЃСЏ РѕС‚ СЃРѕРѕР±С‰РµРЅРёР№.
     */
    this.subscription_once = function(specialMarker, callBack)
    {
        var thisObj = this;
        var sigId = specialMarker+"&&";

        // РџРѕРґРїРёСЃРєР° РЅР° СЃРѕРѕР±С‰РµРЅРёСЏ РѕС‚ СЃРµСЂРІРµСЂР° РґРѕСЃС‚Р°РІР»РµРЅС‹Рµ СЃРїРµС†РёР°Р»СЊРЅРѕ Рё РµРґРёРЅРѕСЂР°Р·РѕРІРѕ РґР»СЏ РїРµСЂРµРґР°РЅРЅРѕРіРѕ callBack
        sigId += thisObj.tabSignal.connect(specialMarker, specialMarker, function(param)
        {
            thisObj.tabSignal.disconnect(specialMarker, specialMarker);
            callBack(param);
        });

        return sigId;
    };

    /**
     * РњР°СЃСЃРёРІ РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂРѕРІ РїРѕРґРїРёСЃРѕРє, РЅСѓР¶РµРЅ РґР»СЏ С‚РѕРіРѕ С‡С‚РѕР± Р±С‹Р»Рѕ РјРѕР¶РЅРѕ РѕС‚РїРёСЃР°С‚СЊСЃСЏ РѕС‚ РІСЃРµС… РїРѕРґРїРёСЃРѕРє СЃСЂР°Р·Сѓ.
     * @type Array
     */
    this.subscription_slot_array = [];

    /**
     * РћС‚РїРёСЃС‹РІР°РµС‚ РѕС‚РїРёС€РµС‚ РѕС‚ РІСЃРµС… РїРѕРґРїРёСЃРѕРє СЃСЂР°Р·Сѓ.
     * @public
     */
    this.unsubscriptionAll = function()
    {
        for(var i = 0; i < this.subscription_slot_array.length; i++)
        {
            var val = this.subscription_slot_array[i];

            var sigName = val.replace(/^(.*)&&.*$/, "$1");
            var slotName = val.replace(/^.*&&(.*)$/, "$1");
            this.tabSignal.disconnect(slotName, sigName);
        }

        this.subscription_slot_array = [];
        return true;
    };

    /**
     * РћС‚РїРёСЃС‹РІР°РµС‚ С„СѓРЅРєС†РёСЋ РѕС‚ РїРѕР»СѓС‡РµРЅРёСЏ СЃРѕРѕР±С‰РµРЅРёР№
     * @public
     * @param {string} sigId РРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ РїРѕРґРїРёСЃРєРё, РІРѕР·РІСЂР°С‰Р°РµС‚СЃСЏ С„СѓРЅРєС†РёРµР№ subscription РІ РјРѕРјРµРЅС‚ РїРѕРґРїРёСЃРєРё.
     */
    this.unsubscription = function(sigId)
    {
        if(sigId === undefined)
        {
            console.warn("cometApi.unsubscription РІС‹Р·РІР°РЅ Р±РµР· Р°СЂРіСѓРјРµРЅС‚РѕРІ.");
            console.warn("Р§С‚РѕР±С‹ РѕС‚РїРёСЃР°С‚СЊСЃСЏ РѕС‚ РІСЃРµС… РїРѕРґРїРёСЃРѕРє СЂР°Р·РѕРј РІС‹Р·РѕРІРµС‚Рµ cometApi.unsubscriptionAll() ");
            return false;
        }
        else if(!sigId)
        {
            return false;
        }

        var sigName = sigId.replace(/^(.*)&&.*$/, "$1");
        var slotName = sigId.replace(/^.*&&(.*)$/, "$1");
        return this.tabSignal.disconnect(slotName, sigName);
    };

    var localArr_uuid = {}
    this.addUUID = function(uuid)
    {
        var d = new Date();
        try{
            localArr_uuid[uuid] = d.getTime();
        }catch (e){}
    };

    this.testUUID = function(uuid)
    {
        try{
            return localArr_uuid[uuid]
        }catch (e){}
    };

    this.clearUUID = function()
    {
        var d = new Date();
        var time = d.getTime();

        try{
            localArr_uuid = {}
        }catch (e){}
    };

    /**
     * Р”РѕР±Р°РІР»СЏРµС‚ РїРѕРґРїРёСЃРєРё РЅР° РєР°РЅР°Р»С‹, СЃРѕР±С‹С‚РёСЏ РІ РєР°РЅР°Р»Р°С… Рё РѕС‚С‡С‘С‚С‹ Рѕ РґРѕСЃС‚Р°РІРєРµ СЃРѕРѕР±С‰РµРЅРёР№ РІ РєР°РЅР°Р»С‹.
     *
     * РџРѕРґРїРёСЃРєР° РЅР° РєР°РЅР°Р» "РРјСЏ_РєР°РЅР°Р»Р°"
     * CometServer().subscription("РРјСЏ_РєР°РЅР°Р»Р°", function(e){ console.log(e)})
     *
     * РџРѕРґРїРёСЃРєР° РЅР° РєР°РЅР°Р» СЃРѕР±С‹С‚РёРµ "РёРјСЏ_СЃРѕР±С‹С‚РёСЏ" РІ РєР°РЅР°Р»Рµ "РРјСЏ_РєР°РЅР°Р»Р°"
     * CometServer().subscription("РРјСЏ_РєР°РЅР°Р»Р°.РёРјСЏ_СЃРѕР±С‹С‚РёСЏ", function(e){ console.log(e)})
     *
     * РџРѕРґРїРёСЃРєР° РЅР° РѕС‚С‡С‘С‚ Рѕ РґРѕСЃС‚Р°РІРєРµ РІ РєР°РЅР°Р» "РРјСЏ_РєР°РЅР°Р»Р°"
     * CometServer().subscription("#РРјСЏ_РєР°РЅР°Р»Р°", function(e){ console.log(e)})
     *
     * РџРѕРґРїРёСЃРєР° РЅР° РѕС‚С‡С‘С‚ Рѕ РґРѕСЃС‚Р°РІРєРµ РІ РєР°РЅР°Р» "РРјСЏ_РєР°РЅР°Р»Р°"
     * CometServer().subscription("answer_to_РРјСЏ_РєР°РЅР°Р»Р°", function(e){ console.log(e)})
     *
     * РџРѕРґРїРёСЃРєР° РЅР° РІСЃРµ РІС…РѕРґРёС‰РёРµ СЃРѕРѕР±С‰РµРЅРёСЏ РёР· РІСЃРµС… РєР°РЅР°Р»РѕРІ РЅР° РєРѕС‚РѕСЂС‹Рµ РїРѕРґРїРёСЃР°РЅ СЌС‚РѕС‚ РєР»РёРµРЅС‚
     * CometServer().subscription("", function(e){ console.log(e)})
     *
     * РџРѕРґРїРёСЃРєР° РЅР° РІСЃРµ РІС…РѕРґРёС‰РёРµ СЃРѕРѕР±С‰РµРЅРёСЏ РёР· РІСЃРµС… РєР°РЅР°Р»РѕРІ РЅР° РєРѕС‚РѕСЂС‹Рµ РїРѕРґРїРёСЃР°РЅ СЌС‚РѕС‚ РєР»РёРµРЅС‚
     * CometServer().subscription(function(e){ console.log(e)})
     *
     * РџРѕРґРїРёСЃРєР° РЅР° СЃРѕРѕР±С‰РµРЅРёСЏ РѕС‚ СЃРµСЂРІРµСЂР° РґРѕСЃС‚Р°РІР»РµРЅС‹Рµ РІ СЃРѕРѕС‚РІРµС‚СЃРІРёРё СЃ РґР°РЅРЅС‹РјРё Р°РІС‚РѕСЂРёР·Р°С†РёРё (С‚РѕРµСЃС‚СЊ РїРѕ id РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ)
     * CometServer().subscription("msg", function(e){ console.log(e)})
     *
     * РџРѕРґРїРёСЃРєР° РЅР° СЃРѕРѕР±С‰РµРЅРёСЏ СЃ РёРјРµРЅРµРЅРј СЃРѕР±С‹С‚РёСЏ "РёРјСЏ_СЃРѕР±С‹С‚РёСЏ" РѕС‚ СЃРµСЂРІРµСЂР° РґРѕСЃС‚Р°РІР»РµРЅС‹Рµ РІ СЃРѕРѕС‚РІРµС‚СЃРІРёРё СЃ РґР°РЅРЅС‹РјРё Р°РІС‚РѕСЂРёР·Р°С†РёРё (С‚РѕРµСЃС‚СЊ РїРѕ id РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ)
     * CometServer().subscription("msg.РёРјСЏ_СЃРѕР±С‹С‚РёСЏ", function(e){ console.log(e)})
     *
     * РћР±СЂР°С‚РёС‚Рµ РІРЅРёРјР°РЅРёРµ С‡С‚Рѕ РґР»СЏРЅР° РёРјРµРЅРё РєР°РЅР°Р»Р° РґРѕР»Р¶РЅР° Р±С‹С‚СЊ Р±РѕР»СЊС€Рµ 2 СЃРёРјРІРѕР»РѕРІ
     * @param {string} name РРјСЏ РєР°РЅР°Р»Р°
     * @param {function} callback Р¤СѓРЅРєС†РёСЏ callback
     * @return string РРјСЏ СЃРёРіРЅР°Р»Р°, РјРѕР¶РµС‚ РїРѕРЅР°РґРѕР±РёС‚СЃСЏ РґР»СЏ С‚РѕРіРѕ С‡С‚РѕР±С‹ РѕС‚РїРёСЃР°С‚СЃСЏ РѕС‚ СЃРѕРѕР±С‰РµРЅРёР№. РР»Рё false РµСЃР»Рё С‡С‚Рѕ С‚Рѕ РїРѕС€Р»Рѕ РЅРµ С‚Р°Рє.
     */
    this.subscription = function(name, callback)
    {
        if(name === undefined )
        {
            return false;
        }

        var thisObj = this;
        var nameArray = name.split("\n");
        if(nameArray.length > 1)
        {
            // РџРѕРґРїРёСЃРєР° РЅР° РјР°СЃСЃРёРІ РєР°РЅР°Р»РѕРІ Р±РµР· РїРµСЂРµРґР°С‡Рё РєРѕР»Р±РµРєР° РёРјРµРµС‚ СЃРјС‹СЃР» РІ С‚РѕРј СЃР»СѓС‡Р°РёРё РєРѕРіРґР° СЌС‚Рѕ РїСЂРѕРёСЃС…РѕРґРёС‚ РїРѕ РёРЅРёС†РёР°С‚РёРІРµ РёР· РґСЂСѓРіРѕР№ РІРєР»Р°РґРєРё.
            for(var i = 0; i < nameArray.length; i++)
            {
                this.subscription(nameArray[i], callback);
            }
            return;
        }

        if(callback === undefined)
        {
            // РџРѕРґРїРёСЃРєР° РЅР° РєР°РЅР°Р» Р±РµР· РїРµСЂРµРґР°С‡Рё РєРѕР»Р±РµРєР° РёРјРµРµС‚ СЃРјС‹СЃР» РІ С‚РѕРј СЃР»СѓС‡Р°РёРё РєРѕРіРґР° СЌС‚Рѕ РїСЂРѕРёСЃС…РѕРґРёС‚ РїРѕ РёРЅРёС†РёР°С‚РёРІРµ РёР· РґСЂСѓРіРѕР№ РІРєР»Р°РґРєРё.
            callback = function(){};
        }

        var sigId = null;
        if(typeof name === "function" )
        {
            // РџРѕРґРїРёСЃРєР° РЅР° РІСЃРµ РІС…РѕРґРёС‰РёРµ СЃРѕРѕР±С‰РµРЅРёСЏ РёР· РІСЃРµС… РєР°РЅР°Р»РѕРІ РЅР° РєРѕС‚РѕСЂС‹Рµ РїРѕРґРїРёСЃР°РЅ СЌС‚РѕС‚ РєР»РёРµРЅС‚
            sigId = "comet_server_msg&&" + this.tabSignal.connect("comet_server_msg", name);
            this.subscription_slot_array.push(sigId);
            return sigId;
        }

        if( name === "msg" || /^msg\./.test(name) )
        {
            // РџРѕРґРїРёСЃРєР° РЅР° СЃРѕРѕР±С‰РµРЅРёСЏ РѕС‚ СЃРµСЂРІРµСЂР° РґРѕСЃС‚Р°РІР»РµРЅС‹Рµ РІ СЃРѕРѕС‚РІРµС‚СЃРІРёРё СЃ РґР°РЅРЅС‹РјРё Р°РІС‚РѕСЂРёР·Р°С†РёРё (С‚РѕРµСЃС‚СЊ РїРѕ id РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ)
            sigId = thisObj.subscription_callBack(name, callback);
            this.subscription_slot_array.push(sigId);
            return sigId;
        }

        if(/^answer_to_web_/.test(name))
        {
            // РџРѕРґРїРёСЃРєР° РЅР° РѕС‚С‡С‘С‚ Рѕ РґРѕСЃС‚Р°РІРєРµ
            sigId = thisObj.subscription_callBack(name, callback);
            this.subscription_slot_array.push(sigId);
            return sigId;
        }
        else if(/^#/.test(name))
        {
            // РџРѕРґРїРёСЃРєР° РЅР° РѕС‚С‡С‘С‚ Рѕ РґРѕСЃС‚Р°РІРєРµ
            name = name.replace("#", "_answer_to_");
            sigId = thisObj.subscription_callBack(name, callback);
            this.subscription_slot_array.push(sigId);
            return sigId;
        }

        if( name === ""  )
        {   // РџРѕРґРїРёСЃРєР° РЅР° РІСЃРµ СЃРѕРѕР±С‰РµРЅРёСЏ СЂР°Р·РѕРј
            name = "comet_server_msg";
        }

        if(name.length < 2 )
        {
            // РРјСЏ РєР°РЅР°Р»Р° СЃР»РёС€РєРѕРј РєРѕСЂРѕС‚РєРѕРµ
            console.error("Error pipe is to short", name);
            return false;
        }

        if(!/^[A-z0-9_.\-]+$/.test(name))
        {
            console.error("Invalid pipe name", name)
        }

        sigId = thisObj.subscription_callBack(name, callback);
        this.subscription_slot_array.push(sigId);

        if( name === "comet_server_msg" )
        {
            // РџРѕРґРїРёСЃРєР° РЅР° РІСЃРµ СЃРѕРѕР±С‰РµРЅРёСЏ СЂР°Р·РѕРј
            return sigId;
        }

        if(this.reg_exp.test(name))
        {
            var res = this.reg_exp.exec(name);
            name = res[1];
        }

        for(var i = 0; i < this.subscription_array.length; i++)
        {
            if(this.subscription_array[i] === name )
            {
                return sigId;
            }
        }

        this.subscription_array[this.subscription_array.length] = name;


        if(this.isMaster() === undefined)
        {
            // РЎС‚Р°С‚СѓСЃ РµС‰С‘ РЅРµ РѕРїСЂРµРґРµР»С‘РЅ
            this.add_msg_to_queue("subscription\n"+this.subscription_array.join("\n"))
        }
        else if(this.isMaster())
        {
            // РњС‹ РјР°СЃС‚РµСЂ РІРєР»Р°РґРєР°
            if(this.LogLevel) console.log("[js-api] add subscription:"+name);

            if(this.UseWebSocket())
            {
                // РћС‚РїСЂР°РІР»СЏРµРј Р·Р°РїСЂРѕСЃ РЅР° РїРѕРґРїРёСЃРєСѓ РЅР° РєР°РЅР°Р» СЃ РЅРµР±РѕР»СЊС€РѕР№ Р·Р°РґРµСЂР¶РєРѕР№
                // С‡С‚РѕР± РµСЃР»Рё Р±С‹Р»Рѕ РґРІР° Рё Р±РѕР»РµРµ РІС‹Р·РѕРІР° С„СѓРЅРєС†РёРё subscription РїРѕРґСЂСЏРґ РѕРЅРё РІСЃРµ РІРјРµСЃС‚Рµ СЃРіРµРЅРµСЂРёСЂРѕРІР°Р»Рё С‚РѕР»СЊРєРѕ 1 Р·Р°РїСЂРѕСЃ Рє РєРѕРјРµС‚ СЃРµСЂРІРµСЂСѓ
                if(this.lastSubscriptionTimeoutId)
                {
                    clearTimeout(this.lastSubscriptionTimeoutId);
                }

                this.lastSubscriptionTimeoutId = setTimeout(function()
                {
                    thisObj.lastSubscriptionTimeoutId = false;

                    thisObj.send_msg("subscription\n"+thisObj.subscription_array.join("\n"))
                }, 50);
            }
            else
            {
                this.restart()
            }
        }
        else
        {
            // РњС‹ slave РІРєР»Р°РґРєР°
            thisObj.tabSignal.emit/*All*/('comet_msg_slave_add_subscription_and_restart',this.subscription_array.join("\n"))
        }
        return sigId;
    };

    this.isMaster = function()
    {
        return this.is_master;
    };

    /**
     * РџРѕРґРїРёСЃС‹РІР°РµС‚СЃСЏ РЅР° РїРѕРґРїРёСЃРєРё Р·Р°РїСЂРѕС€РµРЅС‹Рµ СЂР°РЅРµРµ.
     * @private
     */
    this.send_curent_subscription = function()
    {
        if(this.subscription_array.length === 0)
        {
            return;
        }

        this.send_msg("subscription\n"+this.subscription_array.join("\n"))
    };

    /**
     * РРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
     * @return {this.options.uuid}
     */
    this.getUUID = function()
    {
        if(this.options["uuid"])
        {
            return this.options["uuid"];
        }

        var a = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM_-";
        try{
            if(window['localStorage']['comet_server_uuid'] !== undefined  )
            {
                this.options["uuid"] = window['localStorage']['comet_server_uuid']
            }
            else
            {
                this.options["uuid"] = "";
                for(var i = 0; i< 32; i++)
                {
                    this.options["uuid"] += a[Math.floor(Math.random()*a.length)];
                }
                window['localStorage']['comet_server_uuid']= this.options["uuid"];
            }
        }catch (e)
        {
            this.options["uuid"] = "";
            for(var i = 0; i< 32; i++)
            {
                this.options["uuid"] += a[Math.floor(Math.random()*a.length)];
            }
        }
        return this.options["uuid"];
    };
    /**
     * @private
     */
    this.getUrl = function(nodename)
    {
        if(nodename === undefined)
        {
            nodename = this.options.nodeArray[0]
        }

        if(this.UseWebSocket() === true)
        {
            return 'ws'+this.protocol+'://'+nodename+'/ws/sesion='+this.options.user_key+'&myid='+this.options.user_id+'&devid='+this.options.dev_id+"&v="+this.version+"&uuid="+this.getUUID()+"&api=js";
        }

        return 'http'+this.protocol+'://'+nodename+'/sesion='+this.options.user_key+'&myid='+this.options.user_id+'&devid='+this.options.dev_id+"&v="+this.version+"&uuid="+this.getUUID()+"&api=js";
    };

    this.getUserId = function()
    {
        return this.options.user_id
    };

    this.getUserKey = function()
    {
        return this.options.user_key
    };

    this.getRealUserKey = function()
    {
        return this.tabSignal.getState("real_user_key")
    };

    this.setRealUserKey = function(real_user_key)
    {
        return this.tabSignal.setState("real_user_key", real_user_key)
    };

    this.getDevId = function()
    {
        return this.options.dev_id
    };

    this.UseWebSocket = function(use)
    {
        if(use === true)
        {
            this.use_WebSocket = use;
        }
        else if(use === false)
        {
            this.use_WebSocket = use;
        }
        else if(this.use_WebSocket === undefined)
        {
            this.use_WebSocket = (window.WebSocket !== undefined)
        }

        return this.use_WebSocket;
    };

    /**
     * РЈРєР°Р·С‹РІР°РµС‚ РЅР°РґРѕ Р»Рё РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ wss РёР»Рё РѕР±РѕР№С‚РёСЃСЊ ws
     * @param {Boolean} use
     * @return {Boolean}
     */
    this.UseWss = function(use)
    {
        if(use)
        {
            this.protocol = "s"
        }
        else if(use === undefined && window.location && window.location.protocol)
        {
            this.protocol = window.location.protocol.replace(/[^s]/img, "");
        }
        else
        {
            this.protocol = ""
        }

        return this.protocol === "s"
    };

    this.options.isStart = false;

    this.updateEventKey = function()
    {
        this.tabSignal.setEventKey(this.options.nodeArray.join("_")+"_"+this.options.dev_id +"_"+this.options.user_id)
    };

    /**
     * @return {Boolean} РСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ Р»Рё СЃРµР№С‡Р°СЃ wss
     */
    this.isUseWss = function()
    {
        return this.protocol === "s"
    };
    /**
     * Р—Р°РїСѓСЃРє СЃРѕРµРґРёРЅРµРЅРёСЏ
     * @param {Object} opt РћР±СЉРµРєС‚ СЃ РїР°СЂР°РјРµС‚СЂР°РјРё
     * @param {function} callBack РљРѕР»Р±РµРє РЅР° С„Р°РєС‚ СѓСЃС‚Р°РЅРѕРІРєРё СЃРѕРµРґРёРЅРµРЅРёСЏ
     * @return {Boolean}
     */
    this.start = function(opt, callBack)
    {
        this.options.isStart = true;

        if(opt !== undefined)
        {
            for(var key in opt)
            {
                this.options[key] = opt[key];
            }
        }

        if(this.options.wss != undefined)
        {
            this.UseWss(this.options.wss)
        }

        if(this.options.node)
        {
            if(typeof this.options.node != "string")
            {
                this.options.nodeArray = this.options.node
            }
            else
            {
                // Р—Р°РјРµРЅР° РёРјРµРЅРё node РЅР° nodeArray С‡С‚РѕР± РЅРµ РїРёСЃР°С‚СЊ nodeArray РєРѕРіРґР° РѕРґРЅР° РЅРѕРґР°
                this.options.nodeArray = [this.options.node]
            }
        }

        if(this.options.nodes)
        {
            // Р—Р°РјРµРЅР° РёРјРµРЅРё nodes РЅР° nodeArray
            this.options.nodeArray = this.options.nodes
        }

        if(this.LogLevel) console.log("[js-api] start", [this.custom_id , opt]);

        this.UseWebSocket(window.WebSocket !== undefined);


        if(!this.options.dev_id)
        {
            if(this.options.nodeArray[0] == "app.comet-server.ru")
            {
                console.warn("Comet: Not set dev_id", this.options.dev_id);
                console.warn("Comet: set dev_id = 15 for testing and demo access. Do not use this in production.", this.options.dev_id);
                console.warn("Comet: See https://comet-server.com/wiki/doku.php/en:comet:dev_id or https://comet-server.com/wiki/doku.php/comet:dev_id");
                this.options.dev_id = "15"
            }
            else
            {
                this.options.dev_id = "0"
            }
        }

        this.updateEventKey()
        this.in_abort = false;
        this.conect(callBack);
        return true;
    };

    this.stop = function()
    {
        this.options.isStart = false;
        if(this.isMaster())
        {
            this.in_abort = true;

            if(this.UseWebSocket())
            {
                //this.socket.close();
                for(var i = 0; i < this.socketArray.length; i++)
                {
                    if(this.socketArray[i])
                    {
                        this.socketArray[i].close();
                    }
                }
            }
            else
            {
                this.request.abort();
            }
        }
        else
        {
            this.tabSignal.emit/*All*/('comet_msg_slave_signal_stop')
        }
    };


    /**
     * Р’С‹РїРѕР»РЅСЏРµС‚ РїРµСЂРµРїРѕРґРєР»СЋС‡РµРЅРёРµ
     * @param opt РѕРїС†РёРё РґР»СЏ РїРµСЂРµРїРѕРґРєР»СЋС‡РµРЅРёСЏ
     * @note РЅРµ РіР°СЂР°РЅС‚РёСЂСѓРµС‚ РїСЂР°РІРёР»СЊРЅРѕРµ РїРµСЂРµРїРѕРґРєР»СЋС‡РµРЅРёРµ РїСЂРё СЃРјРµРЅРµ Р°РґСЂРµСЃР° РґР»СЏ РїРѕРґРєР»СЋС‡РµРЅРёСЏ. РўРѕР»СЊРєРѕ СЃРјРµРЅР° Р»РѕРіРёРЅР° Рё РїР°СЂРѕР»СЏ.
     */
    this.restart = function(opt)
    { 
        if(opt !== undefined)
        {
            for(var key in opt)
            {
                this.options[key] = opt[key];
            }
        }

        this.updateEventKey()
        if(!this.options.isStart)
        {
            return this.start(opt);
        }

        if(this.isMaster())
        {
                if(this.UseWebSocket())
                {
                    for(var i = 0; i < this.socketArray.length; i++)
                    {
                        if(this.socketArray[i])
                        {
                            if(this.LogLevel)
                            {
                                console.log("[js-api] restart socket", i);
                            }

                            this.socketArray[i].close();
                        }
                    }
                }
                else
                {
                    this.request.abort();
                }
        }
        else
        {
            this.tabSignal.emit/*All*/('comet_msg_slave_signal_restart', opt);
        }
    };

    this.setAsSlave = function(callback)
    {
        if(callback === undefined)
        {
            callback = function(){};
        }

        var thisObj = this;
        var time_id = false;
        var last_time_id = false;

        // РџРѕРґРїРёСЃРєР° РєРѕР»Р±РµРєР° РєРѕС‚РѕСЂС‹Р№ Р±СѓРґРµС‚ РІС‹РїРѕР»РЅРµРЅ РєРѕРіРґР° РјС‹ РїРѕР»СѓС‡РёРј СЃС‚Р°С‚СѓСЃ slave РІРєР»Р°РґРєРё
        thisObj.tabSignal.connect("slot_comet_msg_set_as_slave",'comet_msg_set_as_slave', function()
        {
            if(thisObj.LogLevel)
            {
                console.log("[js-api] comet_msg_set_as_slave: set is slave");
            }

            // РћС‚РїРёСЃС‹РІР°РµРј СЌС‚РѕС‚ РєРѕР»Р±РµРє
            thisObj.tabSignal.disconnect("slot_comet_msg_set_as_slave", 'comet_msg_set_as_slave');

            // РџРѕРґРїРёСЃРєР° РґР»СЏ send_msg: Р•СЃР»Рё РјС‹ СЃС‚Р°РЅРµРј slave РІРєР»Р°РґРєРѕР№ С‚Рѕ РІСЃРµ СЃРѕРѕР±С‰РµРЅРёСЏ РѕР¶РёРґР°СЋС‰РёРµ РІ РѕС‡РµСЂРµРґРё РѕС‚РїСЂР°РІРёРј РјР°СЃС‚РµСЂ РІРєР»Р°РґРєРµ.
            thisObj.send_msg_from_queue();

            // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» СЃС‚Р°С‚СѓСЃР° Р°РІС‚РѕСЂРёР·Р°С†РёРё РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
            thisObj.tabSignal.connect('__comet_set_authorized_slot', '__comet_authorized', function(param,arg)
            {
                if(thisObj.LogLevel) console.log([param,arg]);
                if(param == "undefined")
                {
                    setTimeout(function()
                    {
                        // РћС‚РїСЂР°РІР»СЏРµРј СЃРёРіРЅР°Р» Р·Р°РїСЂР°С€РёРІР°СЋС‰РёР№ СЃС‚Р°С‚СѓСЃ Р°РІС‚РѕСЂРёР·Р°С†РёРё Сѓ РјР°СЃС‚РµСЂ РІРєР»Р°РґРєРё С‚Р°Рє РєР°Рє РїСЂРёС€С‘Р» СЃРёРіРЅР°Р» СЃ РЅРµРѕРїСЂРµРґРµР»С‘РЅРЅС‹Рј СЃС‚Р°С‚СѓСЃРѕРј
                        thisObj.tabSignal.emit/*All*/('__comet_get_authorized_status');
                    }, 200)
                }
                thisObj.setAuthorized(param)
            });

            // РћС‚РїСЂР°РІР»СЏРµРј СЃРёРіРЅР°Р» Р·Р°РїСЂР°С€РёРІР°СЋС‰РёР№ СЃС‚Р°С‚СѓСЃ Р°РІС‚РѕСЂРёР·Р°С†РёРё Сѓ РјР°СЃС‚РµСЂ РІРєР»Р°РґРєРё
            thisObj.tabSignal.emit/*All*/('__comet_get_authorized_status');
        });

        // РџРѕРґРєР»СЋС‡Р°РµРјСЃСЏ РЅР° СѓРІРµРґРѕРјР»РµРЅРёСЏ РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє Рѕ С‚РѕРј С‡С‚Рѕ СЃРµСЂРІРµСЂ СЂР°Р±РѕС‚Р°РµС‚, РµСЃР»Рё Р·Р° this.start_timer РјРёР»РёСЃРµРєСѓРЅРґ СѓРІРµРґРѕРјР»РµРЅРёРµ РїСЂРѕРёР·РѕР№РґС‘С‚ С‚Рѕ РѕС‚РјРµРЅРёРј РїРѕСЃС‚Р°РІР»РµРЅС‹Р№ СЂР°РЅРµРµ С‚Р°Р№РјРµСЂ
        thisObj.tabSignal.connect("comet_msg_conect",'comet_msg_master_signal', function()
        {
            if(time_id !== false) //  РѕС‚РјРµРЅРёРј РїРѕСЃС‚Р°РІР»РµРЅС‹Р№ СЂР°РЅРµРµ С‚Р°Р№РјРµСЂ РµСЃР»Рё СЌС‚Рѕ РµС‰С‘ РЅРµ СЃРґРµР»Р°РЅРѕ
            {
                clearTimeout( time_id );

                time_id = false;
                if(thisObj.LogLevel) console.log("[js-api] Connection to server canceled");

                thisObj.tabSignal.disconnect("comet_msg_conect", 'comet_msg_master_signal');
                thisObj.tabSignal.connect("comet_msg_conect_to_master_signal",'comet_msg_master_signal', function()
                {
                    if(last_time_id !== false)
                    {
                        clearTimeout( last_time_id );
                    }

                    // РЎРѕР·РґР°РґРёРј С‚Р°Р№РјРµСЂ, РµСЃР»Рё СЌС‚РѕС‚ С‚Р°Р№РјРµСЂ РЅРµ Р±СѓРґРµС‚ РѕС‚РјРµРЅС‘РЅ Р·Р° this.start_timer РјРёР»РёСЃРµРєСѓРЅРґ С‚Рѕ СЃС‡РёС‚Р°РµРј СЃРµР±СЏ РјР°СЃС‚РµСЂ РІРєР»Р°РґРєРѕР№
                    last_time_id = setTimeout(function()
                    {
                        thisObj.tabSignal.disconnect("comet_msg_conect_to_master_signal", 'comet_msg_master_signal');

                        thisObj.in_try_conect = false;
                        thisObj.conect_to_server();
                        callback();
                    }, thisObj.start_timer );
                })
            }

            if(thisObj.LogLevel) console.log("[js-api] set is slave");
            thisObj.is_master = false; // РЈРєР°Р¶РµРј С‡С‚Рѕ РјС‹ СЏРІРЅРѕ РЅРµ РјР°СЃС‚РµСЂ РІРєР»Р°РґРєР° РїРµСЂРµРєР»СЋС‡РёРІ thisObj.is_master РёР· undefined РІ false
            thisObj.tabSignal.emit('comet_msg_set_as_slave', "slave");
        });

        // РЎРѕР·РґР°РґРёРј С‚Р°Р№РјРµСЂ, РµСЃР»Рё СЌС‚РѕС‚ С‚Р°Р№РјРµСЂ РЅРµ Р±СѓРґРµС‚ РѕС‚РјРµРЅС‘РЅ Р·Р° this.start_timer РјРёР»РёСЃРµРєСѓРЅРґ С‚Рѕ СЃС‡РёС‚Р°РµРј СЃРµР±СЏ РјР°СЃС‚РµСЂ РІРєР»Р°РґРєРѕР№
        time_id = setTimeout(function()
        {
            thisObj.tabSignal.disconnect("comet_msg_conect", 'comet_msg_master_signal');

            thisObj.in_try_conect = false;
            thisObj.conect_to_server();
            callback();
        }, this.start_timer )
    };

    /**
     * РЈСЃС‚Р°РЅР°РІР»РёРІР°РµС‚ СЌС‚Сѓ РІРєР»Р°РґРєСѓ РєР°Рє РјР°СЃС‚РµСЂ РІРєР»Р°РґРєСѓ.
     * @private
     */
    this.setAsMaster = function()
    {
        var thisObj = this;
        this.is_master = true;
        if(this.LogLevel) console.log("[js-api] setAsMaster");

        //  РґР»СЏ СѓРІРµРґРѕРјР»РµРЅРёСЏ РІСЃРµС… РѕСЃС‚Р°Р»СЊРЅС‹С… РІРєР»Р°РґРѕРє Рѕ СЃРІРѕС‘Рј РїСЂРµРІРѕСЃС…РѕРґСЃС‚РІРµ
        //thisObj.tabSignal.emit/*All*/('comet_msg_master_signal', {custom_id:this.custom_id});
        thisObj.tabSignal.emit/*All*/('comet_msg_new_master');                                // РґР»СЏ СѓРІРµРґРѕРјР»РµРЅРёСЏ РІСЃРµС… С‡С‚Рѕ РЅР°РґРѕ РїРµСЂРµРїРѕРґРїРёСЃР°С‚СЃСЏ @todo СЂРµР°Р»РёР·РѕРІР°С‚СЊ РїРµСЂРµРїРѕРґРїРёСЃРєСѓ СЃРѕР±С‹С‚РёР№
        var masterSignalIntervalId = setInterval(function()                         // РџРѕСЃС‚Р°РІРёРј С‚Р°Р№РјРµСЂ РґР»СЏ СѓРІРµРґРѕРјР»РµРЅРёСЏ РІСЃРµС… РѕСЃС‚Р°Р»СЊРЅС‹С… РІРєР»Р°РґРѕРє Рѕ СЃРІРѕС‘Рј РїСЂРµРІРѕСЃС…РѕРґСЃС‚РІРµ
        {
            // РџРµСЂРµРґР°С‘Рј РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ СЃРІРѕРµР№ РІРєР»Р°РґРєРё РЅР° С‚РѕС‚ СЃР»СѓС‡Р°Р№ РµСЃР»Рё РІРґСЂСѓРі РїРѕ РѕС€РёР±РєРё РµС‰С‘ РѕРґРЅР° РёР· РІРєР»Р°РґРѕРє РІРѕР·РѕРјРЅРёС‚ СЃРµР±СЏ РјР°СЃС‚РµСЂРѕРј
            // РўРѕ С‚Р° РІРєР»Р°РґРєР° Сѓ РєС‚РѕСЂРѕР№ РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ РјРµРЅСЊС€Рµ СѓСЃС‚СѓРїРёС‚ РїСЂР°РІРѕ Р±С‹С‚СЊ РјР°СЃС‚РµСЂ РІРєР»Р°РґРєРѕР№ С‚РѕР№ РІРєР»Р°РґРєРµ Сѓ РєРѕС‚РѕСЂРѕР№ РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ Р±РѕР»СЊС€Рµ
            //thisObj.tabSignal.emit/*All*/('comet_msg_master_signal', {custom_id:thisObj.custom_id})
        }, this.start_timer/6);

        // РџРѕРґРїРёСЃС‹РІР°РµРјСЃСЏ РЅР° СѓРІРµРґРѕРјР»РµРЅРёСЏ Рѕ С‚РѕРј С‡С‚Рѕ РєС‚Рѕ С‚Рѕ РІРѕР·РѕРјРЅРёР» СЃРµР±СЏ Р±Р°СЃС‚РµСЂ РІРєР»Р°РґРєРѕР№ РґР»СЏ С‚РѕРіРѕ С‡С‚РѕР± РІРѕРІСЂРµРјСЏ СѓР»Р°РґРёС‚СЊ РєРѕРЅС„Р»РёРєС‚ РґРІРѕРµРІР»Р°СЃС‚РёСЏ
        // Рё РЅРµ РґРѕРїСѓСЃС‚РёС‚СЊ СѓСЃС‚Р°РЅРѕРІРєРё Р±РѕР»РµРµ РѕРґРЅРѕРіРѕ СЃРѕРµРґРёРЅРµРЅРёСЏ СЃ РєРѕРјРµС‚ СЃРµСЂРІРµСЂРѕРј, Р° РµСЃР»Рё СЌС‚Рѕ СѓР¶Рµ РїСЂРѕРёР·РѕС€Р»Рѕ С‚Рѕ С…РѕС‚СЏР±С‹ РѕС‚РєР»СЋС‡РёС‚СЊ РѕРґРЅРѕ РёР· РЅРёС….
        thisObj.tabSignal.connect("comet_msg_master_detect", 'comet_msg_master_signal', function(event, signal_name, SignalNotFromThisTab)
        {
            if(SignalNotFromThisTab && thisObj.LogLevel)
            {
                console.error("There was a collision, two master tabs were formed")
            }

            if(SignalNotFromThisTab && event.custom_id > thisObj.custom_id)
            {
                if(thisObj.LogLevel) console.log("[js-api] Yield power, go to slave tab mode");

                // РРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ СЃРІРѕРµР№ РІРєР»Р°РґРєРё РјРµРЅСЊС€Рµ С‡РµРј Р±С‹Р» РїСЂРёСЃР»Р°РЅ РІ СЃРёРіРЅР°Р»Рµ РЅР°РґРѕ СѓСЃС‚СѓРїРёС‚СЊ РїСЂР°РІРѕ Р±С‹С‚СЊ РјР°СЃС‚РµСЂ РІРєР»Р°РґРєРѕР№

                // РџРµСЂРµСЃС‚Р°С‘Рј РѕС‚РїСЂР°РІР»СЏС‚СЊ СѓРІРµРґРѕРјР»РµРЅРёСЏ Рѕ С‚РѕРј С‡С‚Рѕ РјС‹ РјР°СЃС‚РµСЂ
                clearInterval(masterSignalIntervalId);

                // РћС‚РїРёСЃС‹РІР°РµРј СЌС‚РѕС‚ РєРѕР»Р±РµРє
                thisObj.tabSignal.disconnect('comet_msg_master_detect', "comet_msg_master_signal");


                // РћС‚РїРёСЃС‹РІР°РµРјСЃСЏ РѕС‚ РІСЃРµРіРѕ Р·Р° С‡РµРј РґРѕР»Р¶РµРЅР° СЃР»РёРґРёС‚СЊ РјР°СЃС‚РµСЂРІРєР»Р°РґРєР°

                // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» СЂРµСЃС‚Р°СЂС‚Р° РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
                thisObj.tabSignal.disconnect('comet_master_tab', "comet_msg_slave_signal_restart");

                // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» РѕСЃС‚РѕРЅРѕРІРєРё РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
                thisObj.tabSignal.disconnect('comet_master_tab', "comet_msg_slave_signal_stop");

                // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» Р·Р°РїСѓСЃРєР° РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
                thisObj.tabSignal.disconnect('comet_master_tab', "comet_msg_slave_signal_start");

                // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» РїРµСЂРµРїРѕРґРїРёСЃРєРё РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
                thisObj.tabSignal.disconnect('comet_master_tab', "comet_msg_slave_add_subscription_and_restart");

                // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» РѕС‚РїСЂР°РІРєРё СЃРѕРѕР±С‰РµРЅРёР№ РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
                thisObj.tabSignal.disconnect('comet_master_tab', "comet_msg_slave_send_msg");

                // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» Р·Р°РїСЂРѕСЃР° СЃС‚Р°С‚СѓСЃР° Р°РІС‚РѕСЂРёР·Р°С†РёРё РЅР° РєРѕРјРµС‚ СЃРµСЂРІРµСЂРµ  РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
                thisObj.tabSignal.disconnect('comet_master_tab', "__comet_get_authorized_status");


                thisObj.setAsSlave()
            }
        });

        // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» СЂРµСЃС‚Р°СЂС‚Р° РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
        thisObj.tabSignal.connect('comet_master_tab', 'comet_msg_slave_signal_restart', function(p,arg)
        {
            if(thisObj.LogLevel) console.log([p,arg]);
            thisObj.restart(p)
        });

        // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» РѕСЃС‚РѕРЅРѕРІРєРё РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
        thisObj.tabSignal.connect('comet_master_tab', 'comet_msg_slave_signal_stop', function(p,arg)
        {
            if(thisObj.LogLevel) console.log([p,arg]);
            thisObj.stop()
        });

        // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» Р·Р°РїСѓСЃРєР° РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
        thisObj.tabSignal.connect('comet_master_tab', 'comet_msg_slave_signal_start', function(p,arg)
        {
            // @todo РґРѕР±Р°РІРёС‚СЊ РІ СЃР±РѕСЂ СЃС‚Р°С‚РёСЃС‚РёРєРё РёРЅС„РѕСЂРјР°С†РёСЋ Рѕ РєРѕР»РІРµ РІРєР»Р°РґРѕРє
            if(thisObj.LogLevel) console.log([p,arg]);
            thisObj.start()
        });

        // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» РїРµСЂРµРїРѕРґРїРёСЃРєРё РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
        thisObj.tabSignal.connect('comet_master_tab', 'comet_msg_slave_add_subscription_and_restart', function(p,arg)
        {
            if(thisObj.LogLevel) console.log([p,arg]);
            thisObj.subscription(p)
        });

        // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» РѕС‚РїСЂР°РІРєРё СЃРѕРѕР±С‰РµРЅРёР№ РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
        thisObj.tabSignal.connect('comet_master_tab', 'comet_msg_slave_send_msg', function(p,arg)
        {
            if(thisObj.LogLevel) console.log([p,arg]);
            thisObj.send_msg(p)
        });

        // Р•СЃР»Рё РјС‹ Р±С‹Р»Рё slave Р° СЃС‚Р°Р»Рё mster С‚Рѕ РѕС‚РїРёСЃС‹РІР°РµРјСЃСЏ РѕС‚ СЃРёРіРЅР°Р»Р° РѕР± РёР·РјРµРЅРµРЅРёРё СЃС‚Р°С‚СѓСЃР° Р°РІС‚РѕСЂРёР·Р°С†РёРё.
        thisObj.tabSignal.disconnect('__comet_set_authorized_slot', "__comet_authorized");

        // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» Р·Р°РїСЂРѕСЃР° СЃС‚Р°С‚СѓСЃР° Р°РІС‚РѕСЂРёР·Р°С†РёРё РЅР° РєРѕРјРµС‚ СЃРµСЂРІРµСЂРµ  РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
        thisObj.tabSignal.connect('comet_master_tab', '__comet_get_authorized_status', function(p,arg)
        {
            thisObj.tabSignal.emit/*All*/("__comet_authorized", thisObj.isAuthorized())
        });

        // Р Р°Р· РІ РїСЏС‚СЊ РјРёРЅСѓС‚ СѓРґР°Р»СЏРµРј СЃС‚Р°СЂС‹Рµ РґР°РЅРЅС‹Рµ РёР· localStorage
        setInterval(thisObj.clearUUID, 1000*60*3)
    };

    /**
     * @private
     */
    this.setAuthorized = function(value)
    {
        if(this.LogLevel) console.log("[js-api] setAuthorized:", value);

        if(this.authorized_status !== value && value === true)
        {
            // РСЃРїСѓСЃРєР°РµС‚ СЃРёРіРЅР°Р» СѓСЃРїРµС€РЅРѕР№ Р°РІС‚РѕСЂРёР·Р°С†РёРё РЅР° РєРѕРјРµС‚ СЃРµСЂРІРµСЂРµ
            this.tabSignal.emit("__comet_onAuthSuccess")
        }
        else if(this.authorized_status !== value && value === false)
        {
            // РСЃРїСѓСЃРєР°РµС‚ СЃРёРіРЅР°Р» РЅРµ СѓСЃРїРµС€РЅРѕР№ Р°РІС‚РѕСЂРёР·Р°С†РёРё РЅР° РєРѕРјРµС‚ СЃРµСЂРІРµСЂРµ
            this.tabSignal.emit("__comet_onAuthFalill")
        }

        this.authorized_status = value;

        if(this.isMaster())
        {
            this.tabSignal.emit/*All*/("__comet_authorized", this.authorized_status)
        }
    };

    /**
     * Р”РѕР±Р°РІР»СЏРµС‚ РєРѕР»Р±РµРє РЅР° СЃРѕР±С‹С‚РёРµ СѓСЃРїРµС€РЅРѕР№ Р°РІС‚РѕСЂРёР·Р°С†РёРё РЅР° РєРѕРјРµС‚ СЃРµСЂРІРµСЂРµ
     * callback Р±СѓРґРµС‚ РІС‹Р·РІР°РЅ РїСЂРё РєР°Р¶РґРѕР№ СЃРјРµРЅРµ СЃС‚Р°С‚СѓСЃР° Р°РІС‚РѕСЂРёР·Р°С†РёРё.
     * РўР°Рє С‡С‚Рѕ РµСЃР»Рё Р°РІС‚РѕСЂРёР·Р°С†РёСЏ РІ РїСЂРѕС†РµСЃРµ СЂР°Р±РѕС‚С‹ РІРґСЂСѓРі Р±СѓРґРµС‚ РїРѕС‚РµСЂСЏРЅР°,
     * Р° РїРѕС‚РѕРј С‡РµСЂРµР· РєР°РєРѕРµ С‚Рѕ РІСЂРµРјСЏ СЃРЅРѕРІР° РІРѕСЃС‚Р°РЅРѕРІР»РµРЅР° РєРѕР»Р±РµРєРё Р±СѓРґСѓС‚ РІС‹Р·РІР°РЅС‹ РїРѕРІС‚РѕСЂРЅРѕ
     * @param {function} callback
     * @public
     */
    this.onAuthSuccess = function(callback)
    {
        this.tabSignal.connect("__comet_onAuthSuccess", callback)
    };

    /**
     * Р”РѕР±Р°РІР»СЏРµС‚ РєРѕР»Р±РµРє РЅР° СЃРѕР±С‹С‚РёРµ РЅРµ СѓСЃРїРµС€РЅРѕР№ Р°РІС‚РѕСЂРёР·Р°С†РёРё РЅР° РєРѕРјРµС‚ СЃРµСЂРІРµСЂРµ
     * callback Р±СѓРґРµС‚ РІС‹Р·РІР°РЅ РїСЂРё РєР°Р¶РґРѕР№ СЃРјРµРЅРµ СЃС‚Р°С‚СѓСЃР° Р°РІС‚РѕСЂРёР·Р°С†РёРё.
     * РўР°Рє С‡С‚Рѕ РµСЃР»Рё Р°РІС‚РѕСЂРёР·Р°С†РёСЏ РІ РїСЂРѕС†РµСЃРµ СЂР°Р±РѕС‚С‹ РІРґСЂСѓРі Р±СѓРґРµС‚ РїРѕС‚РµСЂСЏРЅР°,
     * Р° РїРѕС‚РѕРј С‡РµСЂРµР· РєР°РєРѕРµ С‚Рѕ РІСЂРµРјСЏ СЃРЅРѕРІР° РІРѕСЃС‚Р°РЅРѕРІР»РµРЅР° РєРѕР»Р±РµРєРё Р±СѓРґСѓС‚ РІС‹Р·РІР°РЅС‹ РїРѕРІС‚РѕСЂРЅРѕ
     * @param {function} callback
     * @public
     */
    this.onAuthFalill = function(callback)
    {
        this.tabSignal.connect("__comet_onAuthFalill", callback)
    };

    /**
     * Р’РѕР·РІСЂР°С‰Р°РµС‚ СЃС‚Р°С‚СѓСЃ Р°РІС‚РѕСЂРёР·Р°С†РёРё РЅР° РєРѕРјРµС‚ СЃРµСЂРІРµСЂРµ.
     * @return bolean true Р°РІС‚РѕСЂРёР·РѕРІР°РЅ, false РЅРµ Р°РІС‚РѕСЂРёР·РѕРІР°РЅ Рё undefined РµСЃР»Рё СЃС‚Р°С‚СѓСЃ РµС‰С‘ РЅРµ РёР·РІРµСЃС‚РµРЅ.
     * @public
     */
    this.isAuthorized = function()
    {
        return this.authorized_status;
    };

    /**
     * Р•СЃР»Рё true С‚Рѕ РїСЂРѕРёР·РѕС€Р»Р° РєСЂРёС‚РёС‡РµСЃРєР°СЏ РѕС€РёР±РєР° РїРѕСЃР»Рµ РєРѕС‚РѕСЂРѕР№ РЅРµС‚ СЃРјС‹СЃР»Р° РїРѕРґРєР»СЋС‡Р°С‚СЃСЏ Рє СЃРµСЂРІРµСЂСѓ
     * @private
     */
    this.hasCriticalError = [];

    /**
     * РћР±СЂР°Р±Р°С‚С‹РІР°РµС‚ СЂР°СЃРїР°СЂСЃРµРЅРѕРµ РІС…РѕРґСЏС‰РµРµ СЃРѕРѕР±С‰РµРЅРёРµ
     *
     * Р¤РѕСЂРјР°С‚ СЃРѕРѕР±С‰РµРЅРёСЏ:{msg:"", pipe:"", eror:""}
     * @param {string} msg
     * @param {int} indexInWsArr РёРЅРґРµРєСЃ РєРѕРЅРµРєС‚Р° РІ РјР°СЃСЃРёРІРµ СЃРµСЂРІРµСЂРѕРІ РєР»Р°СЃС‚РµСЂР°
     * @private
     */
    this.msg_cultivate = function( msg,  indexInWsArr)
    {
        if(this.LogLevel) console.log("[js-api] msg", msg);
        if( msg.data === undefined )
        {
            return -1;
        }

        if(msg.error > 400)
        {
            // РљСЂРёС‚РёС‡РµСЃРєР°СЏ РѕС€РёР±РєР°, РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅРµРІРѕР·РјРѕР¶РЅРѕ. http://comet-server.ru/wiki/doku.php/comet:javascript_api:error
            console.error("CometServerError:"+msg.error, "\n", msg.data, "\n", "Fatal error, connection impossible. Details in the documentation http://comet-server.com/wiki/doku.php/comet:javascript_api:error" )
            this.hasCriticalError[indexInWsArr] = true;
        }

        if(msg.jscode !== undefined)
        {
            eval(msg.jscode);
            return 0;
        }

        if(msg.authorized !== undefined && msg.event == "serverInfo" && msg.pipe == "sys")
        {
            // РўР°РєР°СЏ РїСЂРѕРІРµСЂРєР° СЏРІР»СЏРµС‚СЃСЏ РЅР°СЃР»РµРґСЃС‚РІРѕРј РѕР±СЂР°С‚РЅРѕР№ СЃРѕРІРјРµСЃС‚РёРјРѕСЃС‚Рё РІРµСЂСЃРёР№ api msg.authorized === "true" || msg.authorized === true
            // @todo РїРµСЂРµРґР°РІР°С‚СЊ Рё СѓС‡РёС‚С‹РІР°С‚СЊ СЃ РєР°РєРѕР№ РЅРѕРґС‹ РїСЂРёС€С‘Р» СЃС‚Р°С‚СѓСЃ indexInWsArr С‡С‚РѕР± СЃС‡РёС‚Р°С‚СЊ СЃРµР±СЏ Р°РІС‚РѕСЂРёР·РѕРІР°РЅРЅС‹Рј РµСЃР»Рё С…РѕС‚СЏ Р±С‹ РЅР° РѕРґРЅРѕР№ РёР· РЅРѕРґ Р°РІС‚РѕСЂРёР·РѕРІР°РЅ.
            this.setAuthorized(msg.authorized === "true" || msg.authorized === true); 
            this.setRealUserKey(msg.data.replace(" ", "_"));
            return 0;
        }

        var web_id = 0;
        if(/^A::/.test(msg.data))
        {
            // РџСЂРѕРІРµСЂРєР° РЅРµ РїСЂРёС€Р»Р° Р»Рё РІРјРµСЃС‚Рµ СЃ РґР°РЅРЅС‹РјРё РёРЅС„РѕСЂРјР°С†РёСЏ Рѕ РѕС‚РїСЂР°РІРёС‚РµР»Рµ.
            var r = msg.data.split(";");
            web_id = r[0].replace("A::", "")/1;
            msg.data = r[1];
        }

        //if(msg.event_name === undefined)
        //{
        //    msg.data = this.Base64.decode(msg.data)
        //}

        //console.log("msg.data is", typeof msg.data);

        if(typeof msg.data == "string")
        {
            try{
                //if(this.LogLevel) console.log(["msg", msg.data, "web_id:"+web_id]);

                pmsg = JSON.parse(msg.data.replace(/\\'/g, "'"));
                if(pmsg !== undefined)
                {
                    msg.data = pmsg
                }
            }
            catch (failed)
            {
                msg.data = this.stripslashes(msg.data);
                try
                {
                    //if(this.LogLevel) console.log(["msg", msg.data, "web_id:"+web_id]);
                    var pmsg = JSON.parse(msg.data);
                    if(pmsg !== undefined)
                    {
                        msg.data = pmsg
                    }
                }
                catch (failed)
                {
                    try
                    {
                        //if(this.LogLevel) console.log(["msg", msg.data, "web_id:"+web_id]);
                        var pmsg = JSON.parse(msg.data.replace(/\\'/g, "'"));
                        if(pmsg !== undefined)
                        {
                            msg.data = pmsg
                        }
                    }
                    catch (failed) { 
                    
                        msg.data = this.stripslashes(msg.data);
                        try
                        {
                            //if(this.LogLevel) console.log(["msg", msg.data, "web_id:"+web_id]);
                            var pmsg = JSON.parse(msg.data);
                            if(pmsg !== undefined)
                            {
                                msg.data = pmsg
                            }
                        }
                        catch (failed)
                        {
                            try
                            {
                                //if(this.LogLevel) console.log(["msg", msg.data, "web_id:"+web_id]);
                                var pmsg = JSON.parse(msg.data.replace(/\\'/g, "'"));
                                if(pmsg !== undefined)
                                {
                                    msg.data = pmsg
                                }
                            }
                            catch (failed) { }
                        }
                    }
                }
            }
        }

        //var UserData = msg.data;
        //var event_name = msg.event_name;

        /*if(msg.event_name === undefined)
        {
            UserData = msg.data.data;
            event_name = msg.data.event_name
        }*/

        if(msg.user_id)
        {
            web_id = msg.user_id
        }

        var result_msg = {
            "data": msg.data,
            "server_info":{
                "user_id":web_id,
                pipe:msg.pipe,
                event:msg.event,
                message_send_time:msg.message_send_time,
                history:msg.history === true,
                marker:msg.marker,
                uuid:msg.uuid
            }
        };

        //РџСЂРѕРІРµСЂРєРё С‡С‚РѕР± РіР°СЂР°РЅС‚РёСЂРѕРІР°С‚СЊ РѕС‚СЃСѓС‚СЃРІРёРµ РґСѓР±Р»РµР№
        if(msg && msg.uuid)
        {
            if(this.testUUID(msg.uuid))
            {
                if(this.LogLevel) console.log(["Duplicate", result_msg]);
                return;
            }
            else
            {
                this.addUUID(msg.uuid)
            }
        }

        if(msg.data && msg.data._cometApi_uuid) // РџРµСЂРµРїСЂРѕРІРµСЂРёС‚СЊ !!!!
        {
            //РџСЂРѕРІРµСЂРєРё С‡С‚РѕР± РіР°СЂР°РЅС‚РёСЂРѕРІР°С‚СЊ РѕС‚СЃСѓС‚СЃРІРёРµ РґСѓР±Р»РµР№
            if(this.testUUID(msg.data._cometApi_uuid)) // РџРµСЂРµРїСЂРѕРІРµСЂРёС‚СЊ !!!!
            {
                if(this.LogLevel) console.log(["Duplicate", result_msg]);
                return;
            }
            else
            {
                this.addUUID(result_msg['data']._cometApi_uuid);
                delete result_msg['data']._cometApi_uuid
            }
        }

        if(this.LogLevel) console.log(["final msg", result_msg]);


        if(msg.pipe != undefined)
        {
            // Р•СЃР»Рё СЃРІРѕР№СЃС‚РІРѕ pipe РѕРїСЂРµРґРµР»РµРЅРѕ С‚Рѕ СЌС‚Рѕ СЃРѕРѕР±С‰РµРЅРёРµ РёР· РєР°РЅР°Р»Р°.
            this.tabSignal.emit/*All*/(msg.pipe, result_msg);

            if(msg.event !== undefined && ( typeof msg.event === "string" || typeof msg.event === "number" ) )
            {
                this.tabSignal.emit/*All*/(msg.pipe+"."+msg.event, result_msg)
            }
        }
        else if(msg.event !== undefined && ( typeof msg.event === "string" || typeof msg.event === "number" ) )
        {
            // РЎРѕРѕР±С‰РµРЅРёРµ РґРѕСЃС‚Р°РІР»РµРЅРѕРµ РїРѕ id СЃ СѓРєР°Р·Р°РЅРёРµРј msg.event
            this.tabSignal.emit/*All*/("msg."+msg.event, result_msg);
            this.tabSignal.emit/*All*/("msg", result_msg)
        }
        else
        {
            // РЎРѕРѕР±С‰РµРЅРёРµ РґРѕСЃС‚Р°РІР»РµРЅРѕРµ РїРѕ id Р±РµР· СѓРєР°Р·Р°РЅРёСЏ msg.event
            this.tabSignal.emit/*All*/("msg", result_msg)
        }

        if(msg.marker)
        {
            this.tabSignal.emit/*All*/(msg.marker, result_msg);
        }

        this.tabSignal.emit/*All*/("comet_server_msg", result_msg);
        return 1;
    };

    /**
     * Р’РµСЂРЅС‘С‚ true РµСЃР»Рё С…РѕС‚СЊ РѕРґРЅРѕ СЃРѕРµРґРёРЅРµРЅРёРµ СѓСЃС‚Р°РЅРѕРІР»РµРЅРѕ Рё Р°РєС‚РёРІРЅРѕ
     * @return {Boolean}
     */
    this.socketArrayTest = function()
    {
        for(var i = 0; i < this.socketArray.length; i++)
        {
            var socket = this.socketArray[i];
            if(socket &&  socket.readyState === 1)
                return true;
        }

        if(this.LogLevel > 3 ) console.log("[js-api] socketArrayTest:false");
        return false;
    };


    this.messageHistory = [];
    this.isSendErrorReport = false;

    /**
     * РћС‚РїСЂР°РІР»СЏРµС‚ РґР°РЅРЅС‹Рµ РїРѕ РІРµР±СЃРѕРєРµС‚Сѓ (РїРѕ РїРµСЂРІРѕРјСѓ РёР· СЃРїРёСЃРєР°, Рё РµСЃР»Рё РѕРЅ РЅРµ РґРѕСЃС‚СѓРїРµРЅ С‚Рѕ РїРѕ РІС‚РѕСЂРѕРјСѓ.)
     * @param {string} data
     * @return {boolean}
     */
    this.socketArraySend = function(data)
    {
        var count = 0;
        for(var i = 0; i < this.socketArray.length; i++)
        {
            var socket = this.socketArray[i];
            if(socket &&  socket.readyState === 1)
            {
                try
                {
                    if(this.messageHistory.length < 1000)
                    {
                        var now = new Date();
                        this.messageHistory.push({data:data, time:now.getTime()})
                    }

                    socket.send(data);
                }
                catch (ex)
                {
                    if(this.LogLevel )
                    {
                        console.log("[js-api] Failed to send data ", data, ex);
                        continue;
                    }
                }

                // РћС‚РїСЂР°РІР»СЏС‚СЊ РїРѕРґРїРёСЃРєРё РІСЃРµРј Р° РЅРµ РїРµСЂРІРѕРјСѓ РїРѕРїР°РІС€РµРјСѓСЃСЏ (С‚РѕРµСЃС‚СЊ РєР»Р°СЃС‚РµСЂ РїРѕРґРґРµСЂР¶Р°РЅРёСЏ РЅР°РґС‘Р¶РЅРѕСЃС‚Рё Р° РЅРµ РєР»Р°СЃС‚РµСЂ РґРµР»РµРЅРёСЏ РЅР°РіСЂСѓР·РєРё) [ РћС‚ TV seregaTV]
                //return true;
                count++;
            }
        }

        // РћС‚РїСЂР°РІР»СЏС‚СЊ РїРѕРґРїРёСЃРєРё РІСЃРµРј Р° РЅРµ РїРµСЂРІРѕРјСѓ РїРѕРїР°РІС€РµРјСѓСЃСЏ (С‚РѕРµСЃС‚СЊ РєР»Р°СЃС‚РµСЂ РїРѕРґРґРµСЂР¶Р°РЅРёСЏ РЅР°РґС‘Р¶РЅРѕСЃС‚Рё Р° РЅРµ РєР»Р°СЃС‚РµСЂ РґРµР»РµРЅРёСЏ РЅР°РіСЂСѓР·РєРё) [РћС‚ TV seregaTV]
        if(count) return true;

        return false;
    };

    /**
     * РћС‚РїСЂР°РІР»СЏРµС‚ РІСЃРµ СЃРѕРѕР±С‰РµРЅРёСЏ РёР· РѕС‡РµСЂРµРґРё РЅР° РєРѕРјРµС‚ СЃРµСЂРІРµСЂ.
     * @private
     */
    this.send_msg_from_queue = function()
    {
        var thisObj = this
        if(this.isMaster() === undefined)
        {
            return false;
        }
        else if(this.isMaster() === false)
        {
            // РћС‚РїСЂР°РІРєР° Р·Р°РїСЂРѕСЃР° РЅР° РѕС‚РїСЂР°РІРєСѓ СЃРѕРѕР±С‰РµРЅРёСЏ РјР°СЃС‚РµСЂРІРєР»Р°РґРєРµ
            if(this.send_msg_subscription !== false)
            {
                this.tabSignal.emit/*All*/('comet_msg_slave_add_subscription_and_restart',this.send_msg_subscription);
                this.send_msg_subscription = false;
            }

            if(this.send_msg_queue.length > 0)
            {
                for(var i = 0; i < this.send_msg_queue.length; i++)
                {
                    this.tabSignal.emit/*All*/('comet_msg_slave_send_msg',this.send_msg_queue[i]);
                }
                this.send_msg_queue = []
            }
            return true;
        }
        else if(this.isMaster())
        {
            if(!this.UseWebSocket())
            {
                return false;
            }

            if(this.socketArrayTest())
            {
                if(this.send_msg_subscription !== false)
                {
                    if(this.LogLevel ) console.error("WebSocket-send-subscription:"+this.send_msg_subscription);
                    this.socketArraySend(this.send_msg_subscription);
                    this.send_msg_subscription = false;
                }

                if(this.send_msg_queue.length > 0)
                {
                    var j = 10;
                    // РћС‚РїСЂР°РІР»СЏРµС‚ СЃРѕРѕР±С‰РµРЅРёСЏ РёР· РѕС‡РµСЂРµРґРё РЅРµ СЃСЂР°Р·Сѓ Р° СЃ 20РјСЃ РёРЅС‚РµСЂРІР°Р»РѕРј.
                    for(var i = 0; i < this.send_msg_queue.length; i++)
                    {
                        j+= 20;

                        // РџРѕС‚РѕРј СѓР±СЂР°С‚СЊ setTimeout
                        setTimeout( function(ri)
                        {
                            if(this.LogLevel ) console.log("[js-api] WebSocket-send-msg:", ri);
                            thisObj.socketArraySend(ri);
                        }, j, this.send_msg_queue[i])
                    }
                    this.send_msg_queue = []
                }
                return true;
            }
        }
        return false;
    };

    /**
     * Р”РѕР±Р°РІР»СЏРµС‚ СЃРѕРѕР±С‰РµРЅРёСЏ РІ РѕС‡РµСЂРµРґСЊ.
     * @private
     */
    this.add_msg_to_queue = function(msg)
    {
        var MsgType = false;
        MsgType = msg.split("\n");
        MsgType = MsgType[0];

        if(this.LogLevel ) console.log("[js-api] add_msg_to_queue:", msg);
        if(MsgType === "subscription")
        {
            // РџСЂРѕРІРµСЂРєР° РµСЃР»Рё СЃРѕРѕР±С‰РµРЅРёРµ Рѕ РїРѕРґРїРёСЃРєРµ РЅР° РєР°РЅР°Р» С‚Рѕ РµРіРѕ РѕС‚РїСЂР°РІР»СЏС‚СЊ РІРЅРµ РѕС‡РµСЂРµРґРё
            // РџСЂРё СЌС‚РѕРј РЅРµС‚ РЅРµРѕР±С…РѕРґРёРјРѕСЃС‚Рё РѕС‚РїСЂР°РІР»СЏС‚СЊ РїСЂРµРґС‹РґСѓС‰РёРµ СЃРѕРѕР±С‰РµРЅРёРµ РїРѕРґРїРёСЃРєСѓ.
            this.send_msg_subscription = msg;//.replace(/subscription\n/mg, "");
        }
        else
        {
            this.send_msg_queue.push(msg)
        }
    };

    /**
     * РѕС‚РїСЂР°РІРєР° СЃРѕРѕР±С‰РµРЅРёСЏ РїРѕ РІРµР± СЃРѕРєРµС‚Сѓ.
     * @private
     * @param {string} msg РўРµРєСЃС‚ СЃРѕРѕР±С‰РµРЅРёСЏ РІ РІРёРґРµ РѕРґРЅРѕР№ СЃС‚СЂРѕРєРё
     */
    this.send_msg = function(msg)
    {
        if(this.isMaster() === undefined)
        {
            if(this.LogLevel > 3 ) console.log("[js-api] isMaster:undefined");
            this.add_msg_to_queue(msg);
            return false;
        }
        else if(this.isMaster() === false)
        {
            if(this.LogLevel > 3 ) console.log("[js-api] isMaster:false");
            this.tabSignal.emit/*All*/('comet_msg_slave_send_msg',msg);
        }
        else if(this.isMaster())
        {
            if(this.LogLevel > 3 ) console.log("[js-api] isMaster:true");
            if(!this.UseWebSocket())
            {
                console.warn("WebSocket-send-msg: not use");
                return false;
            }

            if(this.socketArrayTest())
            {
                this.send_msg_from_queue();

                if(this.LogLevel > 2 ) console.log("[js-api] WebSocket-send-msg:"+msg);
                this.socketArraySend(msg);
                return true;
            }
            else
            {
                this.add_msg_to_queue(msg);
                return false;
            }
        }
    };

    /**
     * Р’РµСЂРЅС‘С‚ true РІ СЃР»СѓС‡Р°Рё РѕС‚РїСЂР°РІРєРё
     * РћС‚С‡С‘С‚ Рѕ РґРѕСЃС‚Р°РІРєРµ РїСЂРёР№РґС‘С‚ РІ РєР°РЅР°Р» _answer
     * @param {string} pipe_name РёРјСЏ РєР°РЅР°Р»Р°, РґРѕР»Р¶РЅРѕ РЅР°С‡РёРЅР°С‚СЃСЏ СЃ web_
     * @param {string} event_name РёРјСЏ СЃРѕР±С‹С‚РёСЏ РІ РєР°РЅР°Р»Рµ
     * @param {string} msg РЎРѕРѕР±С‰РµРЅРёРµ
     * @return boolean
     * @version 2
     *
     * @todo РґРѕР±Р°РІРёС‚СЊ РІ РІРµСЂСЃРёРё 3 РєРѕР»Р±РµРє РЅР° РєРѕРЅРєСЂРµС‚РЅРѕРµ СЃРѕРѕР±С‰РµРЅРёРµ.
     */
    this.web_pipe_send = function(pipe_name, event_name, msg)
    {
        if(msg === undefined)
        {
            msg = event_name;
            event_name = "undefined";

            if(/[.]/.test(pipe_name))
            {
                event_name = pipe_name.replace(/^[^.]*\.(.*)$/, "$1");
                pipe_name = pipe_name.replace(/^(.*?)\.(.*)/, "$1");
            }
        }

        if(msg === undefined)
        {
            return false;
        }

        if(!/^web_/.test(pipe_name) && !/^webauth_/.test(pipe_name))
        {
            console.error("Invalid channel name `"+pipe_name+"`. The channel should begin with web_", pipe_name);
            return;
        }

        if(this.LogLevel) console.log(["web_pipe_send", pipe_name, msg]);
        return this.send_msg("web_pipe2\n"+pipe_name+"\n"+event_name+"\n*\n"+JSON.stringify(msg));
    };

    this.getTrackPipeUsers = function(pipe_name, callBack)
    {
        if(!/^track_/.test(pipe_name))
        {
            console.error("Invalid channel name `"+pipe_name+"`. The channel should begin with track_", pipe_name);
            return;
        }

        var marker = this.getCustomString();
        this.subscription_once(marker, callBack);
        /*if(callBack !== undefined)
        {
            this.subscription(pipe_name);
        }*/

        if(this.LogLevel) console.log(["track_pipe_users", pipe_name]);
        return this.send_msg("track_pipe_users\n"+pipe_name+"\n"+marker);
    };

    this.getUserData = function(user_id, callBack)
    {
        if(!user_id || /[^0-9]/.test(user_id))
        {
                console.error("Invalid user_id=`"+user_id+"`. The user_id should is integer");
                return;
        }

        if(callBack === undefined)
            {
                return;
            }

            var marker = this.getCustomString();
            this.subscription_once(marker, callBack);

        if(this.LogLevel) console.log(["user_data", user_id]);
        return this.send_msg("user_data\n"+marker+"\n"+user_id);
    };

    /**
     * Р’РµСЂРЅС‘С‚ true РІ СЃР»СѓС‡Р°Рё РѕС‚РїСЂР°РІРєРё
     * РћС‚С‡С‘С‚ Рѕ РґРѕСЃС‚Р°РІРєРµ РїСЂРёР№РґС‘С‚ РІ РєР°РЅР°Р» _answer
     * @param {string} pipe_name РёРјСЏ РєР°РЅР°Р»Р°, РґРѕР»Р¶РЅРѕ РЅР°С‡РёРЅР°С‚СЃСЏ СЃ web_
     * @param {string} event_name РёРјСЏ СЃРѕР±С‹С‚РёСЏ РІ РєР°РЅР°Р»Рµ
     * @param {string} msg РЎРѕРѕР±С‰РµРЅРёРµ
     * @param {int} count РљРѕР»РёС‡РµСЃС‚РІРѕ РїРѕРїС‹С‚РѕРє РѕС‚РїСЂР°РІРєРё = 3
     * @param {int} interval РРЅС‚РµСЂРІР°Р» РјРµР¶РґСѓ РїРѕРїС‹С‚РєР°РјРё = 1000
     * @return boolean
     * @version 0.1
     *
     * РћС‚РїСЂР°РІР»СЏРµС‚ СЃРѕР±С‹С‚Рµ РІ РєР°РЅР°Р» count СЂР°Р· СЃ РёРЅС‚РµСЂРІР°Р»РѕРј interval,
     * РЅРѕ РіР°СЂР°РЅС‚РёСЂСѓРµС‚ С‡С‚Рѕ РјР°РєСЃРёРјСѓРј РѕРґРЅРѕ СЃРѕРѕР±С‰РµРЅРёРµ Р±СѓРґРµС‚ РґРѕСЃС‚Р°РІР»РµРЅРѕ Рё РѕР±СЂР°Р±РѕС‚Р°РЅРЅРѕ (РјРёРЅРёРјСѓРј 0), Р° РѕСЃС‚Р°Р»СЊРЅС‹Рµ Р±СѓРґСѓС‚ РѕС‚Р±СЂРѕС€РµРЅС‹ РєР°Рє РґСѓР±Р»РёРєР°С‚С‹
     */
    this.multi_web_pipe_send = function(pipe_name, event_name, msg, count, interval)
    {
        if(!count)
        {
            count = 3
        }

        if(!interval)
        {
            interval = 1000
        }

        var uuid = "jsapi";
        for(var i = 0; i< 11; i++)
        {
            uuid += "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM"[Math.floor(Math.random()*62)];
        }

        msg._cometApi_uuid = uuid;

        var thisObj = this
        for(var i = 1; i< count; i++)
        {
            setTimeout(function(pipe_name, event_name, msg){
                thisObj.web_pipe_send(pipe_name, event_name, msg)
            }, i*interval, pipe_name, event_name, msg)
        }

        return this.web_pipe_send(pipe_name, event_name, msg)
    };

    /**
     * РћС‚РїСЂР°РІР»СЏРµС‚ СЃС‚Р°С‚РёСЃС‚РёРєСѓ Рѕ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ РїР»Р°РіРёРЅРѕРІ
     * @param {string} plugin_name РРјСЏ РїР»Р°РіРёРЅР°
     * @param {string} plugin_version Р’РµСЂСЃРёСЏ РїР»Р°РіРёРЅР°
     * @param {string} plugin_data Р”Р°РЅРЅС‹Рµ РїР»Р°РіРёРЅР°
     * @return {Boolean}
     */
    this.sendStatistics = function(plugin_name, plugin_version, plugin_data)
    {
        if(this.LogLevel) console.log(["sendStatistics", plugin_name, plugin_version, plugin_data]);
        return this.send_msg("statistics\n"+JSON.stringify(
                {
                    url:window.location.href,
                    dev_id:this.options.dev_id,
                    version: this.version,
                    plugin: {
                        name:plugin_name,
                        version:plugin_version,
                        data:plugin_data
                    }
                }));
    };


    /**
     * РћС‚РїСЂР°РІР»СЏРµС‚ Р·Р°РїСЂРѕСЃ РЅР° РїРѕР»СѓС‡РµРЅРёРµ РёСЃС‚РѕСЂРёРё РїРѕ РєР°РЅР°Р»Сѓ pipe_name
     * @param {string} pipe_name
     * @param {function} callBack РєРѕР»Р±РµРє РґР»СЏ РѕС‚РІРµС‚Р° РѕС‚ СЃРµСЂРІРµСЂР°
     * @return {Boolean}
     */
    this.get_pipe_log = function(pipe_name, callBack)
    {
        if(!pipe_name)
        {
            console.trace("In CppComet API in get_pipe_log function argument `pipe_name` is required")
            return false;
        }

        if(!this.UseWebSocket())
        {
            return false;
        }

        var marker = this.getCustomString();
        if(callBack !== undefined)
        {
            this.subscription(pipe_name, callBack);

            //marker = this.getCustomString();
            //this.subscription_once(marker, callBack);
        }

        this.send_msg("pipe_log\n"+pipe_name+"\n"+marker+"\n");
        return true;
    };

    /**
     * РћС‚РїСЂР°РІР»СЏРµС‚ Р·Р°РїСЂРѕСЃ РЅР° РїРѕР»СѓС‡РµРЅРёРµ РєРѕР»РёС‡РµСЃС‚РІР° РїРѕРґРїРёСЃС‡РёРєРѕРІ РІ РєР°РЅР°Р»Рµ pipe_name
     * @param {string} pipe_name
     * @param {function} callBack РєРѕР»Р±РµРє РґР»СЏ РѕС‚РІРµС‚Р° РѕС‚ СЃРµСЂРІРµСЂР°
     * @return {Boolean}
     */
    this.count_users_in_pipe = function(pipe_name, callBack)
    {
        if(!this.UseWebSocket())
        {
            return false;
        }
        var marker = this.getCustomString();
        this.subscription_once(marker, callBack);
        this.send_msg("pipe_count\n"+pipe_name+"\n"+marker+"\n");
        return true;
    };

    /**
     * Р’РµСЂРЅС‘С‚ false РµСЃР»Рё РјС‹ РЅРµ РїРѕРґРєР»СЋС‡РµРЅС‹ Рє СЃРµСЂРІРµСЂСѓ
     * @private
     */
    this.isConnected = function()
    {
        for(var i = 0; i< this.web_socket_error.length; i++)
        {
            if(this.web_socket_error[i] == 0)
            {
                return true;
            }
        }
        
        return false;
    };
    
    /**
     * РћР±РµСЃРїРµС‡РёРІР°РµС‚ СЂР°Р±РѕС‚Сѓ СЃ СЃСЃРѕРµРґРёРЅРµРЅРёРµРј СЃ СЃРµСЂРІРµСЂРѕРј
     * @private
     */
    this.conect_to_server = function()
    {
        var thisObj = this;

        //if(this.in_conect_to_server)
        //{
        //    if(this.LogLevel) console.log("[js-api] Connection to the server is already installed.");
        //    return;
        //}

        if(this.LogLevel) console.log("[js-api] Connecting to the server");
        //this.in_conect_to_server = true;
        if(!this.isMaster()) this.setAsMaster();

        if(this.UseWebSocket())
        {
            function initSocket(socket, indexInArr)
            {
                if(!thisObj.time_to_reconect_on_error[indexInArr]) thisObj.time_to_reconect_on_error[indexInArr] = 300;
                if(!thisObj.time_to_reconect_on_close[indexInArr]) thisObj.time_to_reconect_on_close[indexInArr] = 30;
                if(!thisObj.web_socket_error[indexInArr]) thisObj.web_socket_error[indexInArr] = 0;

                socket.onopen = function()
                {
                    if(thisObj.LogLevel) console.log("[js-api] WS Connection established.");

                    if(thisObj.send_msg_subscription === false) thisObj.send_curent_subscription(); // РџРѕРґРїРёСЃС‹РІР°РµРјСЃСЏ РЅР° С‚Рѕ С‡С‚Рѕ Р±С‹Р»Рё РїРѕРґРїРёСЃР°РЅС‹ РґРѕ СЂР°Р·СЂС‹РІР° СЃРѕРµРґРёРЅРµРЅРёСЏ

                    // РћС‚РїСЂР°РІРєР° СЃРѕРѕР±С‰РµРЅРёР№ РёР· РѕС‡РµСЂРµРґРё.
                    thisObj.send_msg_from_queue();

                    if(thisObj.options.nostat !== true)
                    {
                        setTimeout(function()
                        {
                            if(thisObj.isSendStatisticsData[indexInArr])
                            {
                                return;
                            }

                            thisObj.isSendStatisticsData[indexInArr] = true;
                            // РћС‚РїСЂР°РІРєР° РґР°РЅРЅС‹С… РїРѕ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЋ СЃРµСЂРІРёСЃР°
                            thisObj.send_msg("statistics\n"+JSON.stringify({url:window.location.href, dev_id:thisObj.options.dev_id, version: thisObj.version}));
                        }, 5000)
                    }
                };

                socket.onclose = function(event)
                {
                    //this.in_conect_to_server = false;
                    if (event.wasClean || thisObj.in_abort === true)
                    {
                        if(thisObj.LogLevel) console.log("[js-api] WS The connection is closed cleanly");
                    }
                    else
                    {
                        if(thisObj.hasCriticalError[indexInArr])
                        {
                            console.warn('Fatal error, connection impossible.');
                            return;
                        }

                        if(thisObj.LogLevel) console.log("[js-api] WS Connection failure"); // РЅР°РїСЂРёРјРµСЂ, "СѓР±РёС‚" РїСЂРѕС†РµСЃСЃ СЃРµСЂРІРµСЂР°
                        socket.close();
                        thisObj.web_socket_error[indexInArr]++; // РЈРІРµР»РёС‡РµРЅРёРµ РєРѕР»РІР° РѕС€РёР±РѕРє РІРµР±СЃРѕРєРµС‚РѕРІ

                        /*if(thisObj.web_socket_error_timeOut_id !== undefined )
                         {
                         clearTimeout(thisObj.web_socket_error_timeOut_id)
                         }

                         // Р•СЃР»Рё РѕС€РёР±РєРё РїСЂРѕРёСЃС…РѕРґСЏС‚ СЂРµРґРєРѕ С‚Рѕ РѕР±РЅСѓР»РёРј СЃС‰С‘С‚С‡РёРє
                         thisObj.web_socket_error_timeOut_id = setTimeout(function()
                         {
                         thisObj.web_socket_error_timeOut_id = undefined;
                         thisObj.web_socket_error = 0;
                         }, thisObj.time_to_reconect_on_error[indexInArr]*2 )*/

                        if( thisObj.web_socket_error[indexInArr] > 2 && thisObj.web_socket_success !== true && !thisObj.isUseWss())
                        {
                            // Р•СЃР»Рё Р·Р° РІСЂРµРјСЏ thisObj.web_socket_error_timeOut РїСЂРѕРёР·РѕС€Р»Рѕ Р±РѕР»РµРµ 2 РѕС€РёР±РѕРє РІРµР±СЃРѕРєРµС‚РѕРІ С‚Рѕ РїСЂРёРЅСѓРґРёС‚РµР»СЊРЅРѕ РІРєР»СЋС‡РёРј wss
                            thisObj.UseWss(true);
                            console.warn("There were more than 2 errors in Web sites including encryption"); // РќРµ РґРµР»Р°С‚СЊ СЌС‚РѕРіРѕ РµСЃР»Рё СѓР¶Рµ Р±С‹Р»Рё РїРµСЂРµРґР°РЅС‹ РґР°РЅРЅС‹Рµ РїРѕ РІРµР±СЃРѕРєРµС‚Сѓ
                        }
                        /*else if( thisObj.web_socket_error[indexInArr] > 3 && thisObj.web_socket_success !== true && thisObj.isUseWss())
                         {
                         // Р•СЃР»Рё Р·Р° РІСЂРµРјСЏ thisObj.web_socket_error_timeOut РїСЂРѕРёР·РѕС€Р»Рѕ Р±РѕР»РµРµ 3 РѕС€РёР±РѕРє РІРµР±СЃРѕРєРµС‚РѕРІ С‚Рѕ РїРµСЂРµР№РґС‘Рј РЅР° long poling
                         // РўР°РєРѕРµ РІРѕР·РјРѕР¶РЅРѕ РµСЃР»Рё С‡РµР»РѕРІРµРє РёСЃРїРѕР»СЊР·СѓРµС‚ РїСЂРѕРєСЃРё РєРѕС‚РѕСЂС‹Р№ РЅРµ РїРѕРґРґРµСЂР¶РёРІР°РµС‚ РІРµР±СЃРѕРєРµС‚С‹
                         // РџРµСЂРµС…РѕРґ РїСЂРѕРёР·РѕР№РґС‘С‚ РїСЂРёРјРµСЂРЅРѕ С‡РµСЂРµР· 3 СЃРµРєСѓРЅРґС‹ СЂР°Р±РѕС‚С‹
                         thisObj.UseWebSocket(false);
                         thisObj.UseWss();
                         console.error("РџСЂРѕРёР·РѕС€Р»Рѕ Р±РѕР»РµРµ 3 РѕС€РёР±РѕРє РІРµР±СЃРѕРєРµС‚РѕРІ С‚Рѕ РїРµСЂРµР№РґС‘Рј РЅР° long poling"); // РќРµ РґРµР»Р°С‚СЊ СЌС‚РѕРіРѕ РµСЃР»Рё СѓР¶Рµ Р±С‹Р»Рё РїРµСЂРµРґР°РЅС‹ РґР°РЅРЅС‹Рµ РїРѕ РІРµР±СЃРѕРєРµС‚Сѓ
                         }*/
                        else if(thisObj.web_socket_error[indexInArr] > 5)
                        {
                            // Р•СЃР»Рё 3 РѕС€РёР±РєРё РїРѕРґСЂСЏРґ С‚Рѕ СѓРІРµР»РёС‡РёРј РІСЂРµРјСЏ РґРѕ СЃР»РµРґСѓСЋС‰РµРіРѕ РїРµСЂРµРїРѕРґРєР»СЋС‡РµРЅРёСЏ
                            thisObj.time_to_reconect_on_error[indexInArr] *= 3;
                        }
                        else if(thisObj.web_socket_error[indexInArr] > 3)
                        {
                            // Р•СЃР»Рё 5 РѕС€РёР±РѕРє РїРѕРґСЂСЏРґ С‚Рѕ РµС‰С‘ Р±РѕР»СЊС€Рµ СѓРІРµР»РёС‡РёРј РІСЂРµРјСЏ РґРѕ СЃР»РµРґСѓСЋС‰РµРіРѕ РїРµСЂРµРїРѕРґРєР»СЋС‡РµРЅРёСЏ
                            thisObj.time_to_reconect_on_error[indexInArr] += 2000;
                        }

                        if(thisObj.web_socket_error[indexInArr] === 0)
                        {
                            // Р•СЃР»Рё СЌС‚Рѕ РїРµСЂРІС‹Р№ РѕР±СЂС‹РІ СЃРѕРµРґРёРЅРµРЅРёСЏ РїРѕРґСЂСЏРґ С‚Рѕ РїРµСЂРµРїРѕРґРєР»СЋС‡Р°РµРјСЃСЏ Р±С‹СЃС‚СЂРµРµ
                            setTimeout(function()
                            {
                                //thisObj.conect_to_server();
                                var conect = function()
                                {
                                    if(navigator.onLine === false)
                                    {
                                        setTimeout(conect, 300);
                                        return;
                                    }

                                    var node = thisObj.options.nodeArray[indexInArr];
                                    var socket = new WebSocket(thisObj.getUrl(node));

                                    thisObj.socketArray[indexInArr] = socket;
                                    initSocket(socket, indexInArr);
                                };

                                conect()
                            }, thisObj.time_to_reconect_on_close[indexInArr] );
                        }
                        else
                        {
                            // Р•СЃР»Рё СЌС‚Рѕ РЅРµ РїРµСЂРІС‹Р№ РѕР±СЂС‹РІ СЃРѕРµРґРёРЅРµРЅРёСЏ РїРѕРґСЂСЏРґ РЅРѕ РґР°РЅРЅС‹Рµ СѓР¶Рµ РѕС‚РїСЂР°РІР»СЏР»РёСЃСЊ С‚Рѕ РѕС‚РїСЂР°РІР»СЏРµРј РѕС‚С‡С‘С‚ РѕР± РѕС€РёР±РєРµ
                            if(thisObj.web_socket_success == true)
                            {
                                //thisObj.errorReportSend();
                            }

                            // Р•СЃР»Рё СЌС‚Рѕ РЅРµ РїРµСЂРІС‹Р№ РѕР±СЂС‹РІ СЃРѕРµРґРёРЅРµРЅРёСЏ РїРѕРґСЂСЏРґ С‚Рѕ РїРµСЂРµРїРѕРґРєР»СЋС‡Р°РµРјСЃСЏ РЅРµ СЃСЂР°Р·Сѓ
                            setTimeout(function()
                            {
                                var conect = function()
                                {
                                    if(navigator.onLine === false)
                                    {
                                        setTimeout(conect, 300);
                                        return;
                                    }

                                    //thisObj.conect_to_server();
                                    var node = thisObj.options.nodeArray[indexInArr];
                                    var socket = new WebSocket(thisObj.getUrl(node));

                                    thisObj.socketArray[indexInArr] = socket;
                                    initSocket(socket, indexInArr);
                                };

                                conect()
                            }, thisObj.time_to_reconect_on_error[indexInArr] );
                        }
                    }
                    if(thisObj.LogLevel) console.log("[js-api] WS Code: " + event.code + " reason: " + event.reason);
                };

                socket.onmessage = function(event)
                {
                    thisObj.web_socket_success = true;
                    thisObj.web_socket_error[indexInArr] = 0;               // Р•СЃР»Рё СѓСЃРїРµС€РЅРѕ РїРѕРґРєР»СЋС‡РёР»РёСЃСЊ СЃР±СЂР°СЃС‹РІР°РµРј СЃС‰С‘С‚С‡РёРє РѕС€РёР±РѕРє
                    thisObj.time_to_reconect_on_error[indexInArr] = 1000;   // Р•СЃР»Рё СѓСЃРїРµС€РЅРѕ РїРѕРґРєР»СЋС‡РёР»РёСЃСЊ СЃР±СЂР°СЃС‹РІР°РµРј СЃС‰С‘С‚С‡РёРє РѕС€РёР±РѕРє

                    if(thisObj.LogLevel > 1) console.log("[js-api] \x1b[1;32mWS Incoming message\x1b[0m:"+event.data);
                    var lineArray = event.data.replace(/^\s+|\s+$/, '').split("\n");
                    for(var i = 0; i < lineArray.length; i++)
                    {
                        var rj = {};
                        try{
                            rj = JSON.parse(lineArray[i].replace(/\\'/g, "'"));
                        }
                        catch (failed)
                        {
                            if(thisObj.LogLevel) console.error(failed);
                            continue;
                        }

                        thisObj.msg_cultivate(rj, indexInArr);
                    }
                };

                socket.onerror = function(error)
                {
                    //thisObj.in_conect_to_server = false;
                    if(thisObj.LogLevel) console.log("[js-api] Error " + error.message);

                };
            }
            
            if(thisObj.socketArray)
            {
                for(var i = 0; i< this.socketArray.length; i++)
                {
                    if(thisObj.socketArray[i])
                    {
                        thisObj.socketArray[i].close();
                    }
                }
            }

            thisObj.socketArray = [];
            var random_node = thisObj.options.user_id % thisObj.options.nodeArray.length;
            if(!random_node)
            {
                random_node = Math.floor(Math.random()*thisObj.options.nodeArray.length)
            }

            for(var i = 0; i < thisObj.options.nodeArray.length; i++)
            {
                if(thisObj.hasCriticalError[i])
                {
                    // Р•СЃР»Рё true С‚Рѕ РїСЂРѕРёР·РѕС€Р»Р° РєСЂРёС‚РёС‡РµСЃРєР°СЏ РѕС€РёР±РєР° РїРѕСЃР»Рµ РєРѕС‚РѕСЂРѕР№ РЅРµС‚ СЃРјС‹СЃР»Р° РїРѕРґРєР»СЋС‡Р°С‚СЃСЏ Рє СЃРµСЂРІРµСЂСѓ
                    continue;
                }


                if(thisObj.options.roundrobin == true && random_node != i)
                {
                    // Р•СЃР»Рё РµСЃС‚СЊ РѕРїС†РёСЏ roundrobin С‚Рѕ РїРѕРґРєР»СЋС‡Р°С‚СЃСЏ Р±СѓРґРµРј С‚РѕР»СЊРєРѕ Рє РѕРґРЅРѕР№ РЅРѕРґРµ РЅР° РѕСЃРЅРѕРІРµ СЃРІРѕРµРіРѕ user_id РёР»Рё СЃР»СѓС‡Р°Р№РЅРѕР№ РЅРѕРґРµ РµСЃР»Рё user_id РЅРµ Р·Р°РґР°РЅ.
                    continue;
                }

                var node = thisObj.options.nodeArray[i];

                console.log("[js-api] conect to " + thisObj.getUrl(node))
                var socket = new window.WebSocket(thisObj.getUrl(node));

                thisObj.socketArray.push(socket);
                initSocket(socket, thisObj.socketArray.length -  1 );
            }
        }
        else
        {
            try {
                thisObj.request = new XMLHttpRequest();
            } catch (trymicrosoft) {
                try {
                    thisObj.request = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (othermicrosoft) {
                    try {
                        thisObj.request = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (failed) {
                        thisObj.request = false;
                    }
                }
            }

            thisObj.request.onreadystatechange = function()
            {
                if( thisObj.request.status === 200 && thisObj.in_abort !== true)
                {
                    var re = thisObj.request.responseText;

                    if(thisObj.LogLevel) console.log("[js-api] Incoming message:"+re);
                    var lineArray = re.replace(/^\s+|\s+$/, '').split('\n');
                    for(var i = 0; i < lineArray; i++)
                    {
                        try{
                            if(thisObj.LogLevel) console.log(lineArray[i]);
                            var rj = JSON.parse(lineArray[i])
                        }
                        catch (failed)
                        {
                            thisObj.in_conect_to_server = false;
                            if(thisObj.LogLevel) console.log("[js-api] Error in xhr, reconnection via "+(thisObj.time_to_reconect_on_error[0]) +" seconds.");
                            setTimeout(function(){thisObj.conect_to_server()}, thisObj.time_to_reconect_on_error[0] );
                            return false;
                        }


                        thisObj.msg_cultivate(rj)
                    }

                    thisObj.in_conect_to_server = false;
                    thisObj.conect_to_server();
                }
                else
                {
                    thisObj.in_conect_to_server = false;
                    if(thisObj.in_abort !== true)
                    {
                        thisObj.xhr_error += 1;
                        if( thisObj.xhr_error > 30 )
                        {
                            thisObj.time_to_reconect_on_error[0] = 90000;
                        }
                        else if( thisObj.xhr_error > 10 )
                        {
                            thisObj.time_to_reconect_on_error[0] = 30000;
                        }
                        else if( thisObj.xhr_error > 3 )
                        {
                            thisObj.time_to_reconect_on_error[0] = 10000;
                        }

                        if(thisObj.LogLevel || 1) console.log("[js-api] Error in xhr, reconnection via "+(thisObj.time_to_reconect_on_error[0]) +" seconds.");
                        setTimeout(function(){ thisObj.conect_to_server() }, thisObj.time_to_reconect_on_error[0] );

                        setTimeout(function(){ thisObj.xhr_error = 0 }, thisObj.xhr_error_timeOut_id )
                    }
                }
            };

            thisObj.request.open("POST", thisObj.getUrl(), true);
            thisObj.request.send(thisObj.subscription_array.join("\n")); // РРјРµРЅРЅРѕ Р·РґРµСЃСЊ РѕС‚РїСЂР°РІР»СЏСЋС‚СЃСЏ РґР°РЅРЅС‹Рµ
        }

    };

    /**
     * РџС‹С‚Р°РµС‚СЃСЏ СѓСЃС‚Р°РЅРѕРІРёС‚СЊ СЃРѕРµРґРёРЅРµРЅРёРµ СЃ СЃРµСЂРІРµСЂРѕРј РёР»Рё РЅР°Р»Р°РґРёС‚СЊ РѕР±РјРµРЅ СЃРѕРѕР±С‰РµРЅРёСЏРјРё Рё РјРѕРЅРёС‚РѕСЂРёРЅРі СЂР°Р±РѕС‚РѕСЃРїРѕСЃРѕР±РЅРѕСЃС‚Рё РјР°СЃС‚РµСЂРІРєР»Р°РґРєРё.
     * @private
     */
    this.conect = function(callback)
    {
        if(this.isMaster())
        {
            return this.conect_to_server();
        }

        if(this.in_try_conect)
        {
            if(this.LogLevel) console.log("[js-api] The connection to the server is already installed on another tab");
            this.tabSignal.emit/*All*/('comet_msg_slave_signal_start');
            return false;
        }

        this.in_try_conect = true;
        if(this.LogLevel) console.log("[js-api] Trying to connect to the server");

        this.setAsSlave(callback)
    };

    return this;
};
var cometServerApi = _cometServerApi

/**
 * Api СЂР°Р±РѕС‚С‹ СЃ РєРѕРјРµС‚ СЃРµСЂРµРІРµСЂРѕРј comet-server.ru
 * @type cometServerApi
 */
var cometApi = new cometServerApi();


/**
 * @return _cometServerApi
 */
function CometServer()
{
    return cometApi; //Object.assign({}, _cometServerApi);
}