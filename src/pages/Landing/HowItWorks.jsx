const HowItWorks = () => {
  const steps = [
    { num: '01', title: 'Create Tournament', desc: 'Set up your point system and add participating teams.' },
    { num: '02', title: 'Enter Data', desc: 'Quickly input match kills and placements via grid or Excel.' },
    { num: '03', title: 'Download Image', desc: 'Instantly download the branded result graphic in high quality.' }
  ];

  return (
    <section id="how-it-works" className="landing-section text-center relative">
      <div className="absolute inset-0 bg-surface opacity-30 skew-y-3 z-0"></div>
      <div className="relative z-10 py-10">
        <h2 className="text-h2 mb-12">How PointFuze Works</h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="step-container">
              <div className="step-number">{step.num}</div>
              <h3 className="text-h4 mb-2">{step.title}</h3>
              <p className="text-body text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
