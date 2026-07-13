import clsx from 'clsx';

const PageContainer = ({ children, className }) => {
  return (
    <div className={clsx('w-full min-h-screen flex flex-col', className)}>
      {children}
    </div>
  );
};

export default PageContainer;
