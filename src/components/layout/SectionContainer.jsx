import clsx from 'clsx';

const SectionContainer = ({ children, className, id }) => {
  return (
    <section id={id} className={clsx('w-full py-16 px-4 md:px-8 max-w-[1200px] mx-auto', className)}>
      {children}
    </section>
  );
};

export default SectionContainer;
