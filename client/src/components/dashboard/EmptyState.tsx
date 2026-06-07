interface Props {
  message: string;
}

const EmptyState = ({
  message,
}: Props) => {
  return (
    <div>
      {message}
    </div>
  );
};

export default EmptyState;