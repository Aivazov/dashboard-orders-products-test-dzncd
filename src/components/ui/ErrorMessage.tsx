type ErrorMessageProps = {
  error: string | null;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <div className='container px-4 py-4'>
      <div className='alert alert-danger' role='alert'>
        Error: {error}
      </div>
    </div>
  );
};

export default ErrorMessage;
