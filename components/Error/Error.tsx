import toast from 'react-hot-toast';

interface ErrorProps {
  message?: string;
}

export default function Error({ message }: ErrorProps) {
  return toast.error(`There was an error ${message}, please try again...`);
}
