const PageContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="min-h-[51rem] px-[7.5rem] py-10">{children}</div>;
};

export default PageContainer;
