const { db } = require('../config/database');

exports.createPaymentIntent = async (req, res) => {
  const id = req.params.id || req.body.bookingId; // booking id
  const userId = req.user.id;

  try {
    const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.client_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // In a real app, you'd call Stripe here
    const stripe_payment_intent_id = `pi_simulated_${Date.now()}`;
    
    db.prepare(`
      UPDATE bookings 
      SET stripe_payment_intent_id = ?, payment_status = 'escrowed' 
      WHERE id = ?
    `).run(stripe_payment_intent_id, id);

    res.json({ 
      clientSecret: 'simulated_secret', 
      paymentIntentId: stripe_payment_intent_id,
      message: 'Payment simulated and escrowed'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.releasePayment = async (req, res) => {
  const id = req.params.id || req.body.bookingId || req.body.sessionId; // booking id or alias
  const userId = req.user.id;

  try {
    const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Usually admin or automatic on completion
    if (booking.status !== 'completed') {
      return res.status(400).json({ error: 'Booking must be completed to release payment' });
    }

    db.prepare("UPDATE bookings SET payment_status = 'released' WHERE id = ?").run(id);

    res.json({ message: 'Payment released to caregiver' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
