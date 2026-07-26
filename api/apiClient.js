class ApiClient {

    constructor(request){
        this.request = request;
    }

    async get(endpoint){
        return await this.request.get(endpoint);
    }

    async post(endpoint,data){
        return await this.request.post(endpoint,{data});
    }

    async put(endpoint,data,headers){
        return await this.request.put(endpoint,{data,headers});
    }

    async delete(endpoint,headers){
        return await this.request.delete(endpoint,{headers});
    }
}


module.exports = ApiClient;