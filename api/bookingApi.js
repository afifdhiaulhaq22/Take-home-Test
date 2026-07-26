class BookingApi {


    constructor(api){
        this.api = api;
    }

    getBookings(){
        return this.api.get('/booking');
    }

    createBooking(payload){
        return this.api.post('/booking',payload);
    }

    getBooking(id){
        return this.api.get(`/booking/${id}`);
    }

    updateBooking(id,payload,token){
        return this.api.put(`/booking/${id}`,payload,{Cookie:`token=${token}`});
    }

    deleteBooking(id,token){
        return this.api.delete(`/booking/${id}`,{Cookie:`token=${token}`});
    }

}


module.exports = BookingApi;