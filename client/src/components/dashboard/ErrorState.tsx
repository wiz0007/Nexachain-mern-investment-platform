interface Props {
  message: string;
}

const ErrorState = ({
  message,
}: Props) => {
  return (
    <div>
      {message}
    </div>
  );
};

export default ErrorState;