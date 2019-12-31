export default {
    ws: {},
    setWs: function(newWs) {
        this.ws = newWs
    },
    loginout(id,token){
        console.log(id,token)
        console.log(id==undefined)
        if(id == undefined || token==undefined){
            console.log('asd')
            return 0
        }else{
            return 1
        }
    },
    inpage(){
        if(!sessionStorage.oo_id||!sessionStorage.oo_token){
            return 0
        }else{
            return 1
        }
    }
}