const FAQ = () => {
  return (
    <section id="faq" className="landing-section">
      <h2 className="text-h2 text-center mb-12">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <div className="faq-item">
          <h4 className="font-semibold mb-2 text-lg text-primary">Which games are supported?</h4>
          <p className="text-body text-sm leading-relaxed">PointFuze is primarily designed for Free Fire, BGMI, PUBG, and COD Mobile, but the point systems are highly configurable to support almost any battle royale or team-based game.</p>
        </div>
        <div className="faq-item">
          <h4 className="font-semibold mb-2 text-lg text-primary">Do I need to know Photoshop?</h4>
          <p className="text-body text-sm leading-relaxed">Not at all! PointFuze generates professional images natively in your browser using predefined customizable templates. Simply input data and click download.</p>
        </div>
        <div className="faq-item">
          <h4 className="font-semibold mb-2 text-lg text-primary">Is there an automatic game integration?</h4>
          <p className="text-body text-sm leading-relaxed">Currently, no. PointFuze relies on manual input or Excel imports. Direct API pulls from games are typically restricted by the developers and are not supported right now.</p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
