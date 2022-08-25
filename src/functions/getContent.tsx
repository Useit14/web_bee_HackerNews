export const getContent = (code: string): React.ReactNode => {
  return <div dangerouslySetInnerHTML={{ __html: code }} />;
};
