const Spinner = () => {
  return (
    <div
      className='spinner-border text-success'
      role='status'
      style={{ width: '1rem', height: '1rem', borderWidth: '0.15em' }}
    >
      <span className='visually-hidden'>Loading...</span>
    </div>
  );
};

export default Spinner;
