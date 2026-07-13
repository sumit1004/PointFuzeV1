import SectionContainer from '../../components/layout/SectionContainer';

const HowItWorks = () => {
  const steps = [
    { num: '01', title: 'Create Tournament', desc: 'Set up your point system and add participating teams.' },
    { num: '02', title: 'Enter Data', desc: 'Quickly input match kills and placements.' },
    { num: '03', title: 'Download Image', desc: 'Instantly download the branded result graphic.' }
  ];

  return (
    <SectionContainer id="how-it-works" className="py-20 text-center">
      <h2 className="text-h2 mb-12">How PointFuze Works</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 relative">
        {steps.map((step, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center max-w-[250px]">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-h3 font-bold mb-4">
              {step.num}
            </div>
            <h3 className="text-h4 mb-2">{step.title}</h3>
            <p className="text-body text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default HowItWorks;
