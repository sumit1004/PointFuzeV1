const Skeleton = ({ className = '', style = {} }) => {
  return (
    <div 
      className={`animate-pulse bg-[rgba(255,255,255,0.05)] rounded-md ${className}`} 
      style={style}
    ></div>
  );
};

export default Skeleton;
