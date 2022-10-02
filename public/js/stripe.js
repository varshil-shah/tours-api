const stripe = Stripe(
  'pk_test_51LnfVgSFERdMDNf1YcXkXuZfB63DxwsiwtEZkVdxC833txxmbHll0U4ddcc7FKxCMxp3SwYnq0OXXzATAX2zLPrs00uqh9HV4z'
);
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    // Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // Create checkout form and charge from credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    showAlert('error', error);
  }
};
