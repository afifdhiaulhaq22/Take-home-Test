const {test, expect} = require('@playwright/test');

const APIClient = require('../../api/apiClient');
const BookingAPI = require('../../api/BookingAPI');

const bookingData = require('../../api/bookingData.json');

const validateSchema = require('../../utils/schemaValidator');
const schema = require('../../schemas/bookingSchema.json');


test.describe('Restful Booker API Testing',()=>{
    test('GET booking list should return 200', async({request})=>{
        const api = new APIClient(request);
        const bookingAPI = new BookingAPI(api);
        const response = await bookingAPI.getBookings();
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();
    });

    test('Create booking and verify data with schema validation',async({request})=>{
        const api = new APIClient(request);
        const bookingAPI = new BookingAPI(api);

        // CREATE BOOKING
        const response = await bookingAPI.createBooking(bookingData);

        expect(response.status()).toBe(200);
        const result = await response.json();
        const bookingId = result.bookingid;
        expect(bookingId).toBeTruthy();

        // GET BOOKING DETAIL
        const detailResponse = await bookingAPI.getBooking(bookingId);
        expect(detailResponse.status()).toBe(200);
        const detail = await detailResponse.json();

        // SCHEMA VALIDATION
        const valid = validateSchema(schema,detail);
        expect(valid).toBeTruthy();

        // DATA VALIDATION
        expect(detail.firstname).toBe(bookingData.firstname);
        expect(detail.lastname).toBe(bookingData.lastname);


    });

    test('Create booking with invalid payload', async({request})=>{
        const api = new APIClient(request);
        const response =
            await api.post(
                '/booking',
                {
                    lastname:"Only lastname"
                }
            );
        expect([400,500])
        .toContain(
            response.status()
        );
    });

});