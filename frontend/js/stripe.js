const stripe = Stripe('pk_test_51Hmgu9LIwMvg7ascDkqSL1vimfuqHrfzbLqVHGaIvYq0KwmP8GerWDRPz7r4QZVbsu5gLOIDd8JCHWBbAFtg5oNT00Jh7UEIPh');
const rentBookBtn = document.getElementById('rent-book');

const rentBook = async bookId => {
    try {
        //1) Get checkout session from endpoint/API
        const session = await axios(`http://127.0.0.1:4000/api/v1/bookings/checkout-session/${bookId}`);
        console.log(session);
        //2) create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        console.log(err);
        alert(err);
    }
};

if(rentBookBtn) {
    rentBookBtn.addEventListener('click', e=> {
        e.target.textContent = 'Processing...';
        const {bookId} = e.target.dataset;
        rentBook(bookId);

    });
}


