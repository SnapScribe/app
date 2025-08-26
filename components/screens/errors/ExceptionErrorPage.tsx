import ErrorPage from '@/components/shared/ErrorPage';

const ExceptionErrorPage = ({ err }: { err: Error }) => (
  <ErrorPage error="Oops!" description={err.message.toString()} />
);

export default ExceptionErrorPage;
