var Lang = {

    //对数据进行初始化
    init:function(obj){
        for (var key in obj) {
            this[key] = JSON.parse(obj[key]);
        };
    },
    change:function(name,vo,zh){
        var res = null;
        if(zh){
            res = this[name][vo];
        }else{
            res = this.findObjVal(name, vo);
        }
        return res;
    },
    findObjVal:function(name,vo){
        //在对象中查找某值，并返回下标
        var obj = this[name];
        for(var key in obj){
            if(obj[key]==vo){
                return key;
            }
        }
    }
};
