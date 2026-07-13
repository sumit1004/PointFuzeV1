import SectionContainer from '../../components/layout/SectionContainer';

const FAQ = () => {
  return (
    <SectionContainer id="faq" className="py-20">
      <h2 className="text-h2 text-center mb-12">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <div className="bg-surface p-4 rounded-lg border border-border">
          <h4 className="font-semibold mb-2">Which games are supported?</h4>
          <p className="text-body text-sm">PointFuze is primarily designed for Free Fire, BGMI, PUBG, and COD Mobile, but the point systems are highly configurable to support almost any battle royale or team-based game.</p>
        </div>
        <div className="bg-surface p-4 rounded-lg border border-border">
          <h4 className="font-semibold mb-2">Do I need to know Photoshop?</h4>
          <p className="text-body text-sm">Not at all! PointFuze generates professional images natively in your browser using predefined customizable templates.</p>
        </div>
      </div>
    </SectionContainer>
  );
};

export default FAQ;
