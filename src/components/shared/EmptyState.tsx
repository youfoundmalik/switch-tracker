import { Button } from "@/ui/button";

interface EmptyStateProps {
  imageSrc: string;
  imageAlt: string;
  message: string;
  buttonText: string;
  onButtonClick: () => void;
}

export function EmptyState({ imageSrc, imageAlt, message, buttonText, onButtonClick }: EmptyStateProps) {
  return (
    <div className='bg-white rounded-lg shadow w-full p-6 flex-1 flex items-center justify-center'>
      <div className='gap-4 flex flex-col items-center justify-center'>
        <img src={imageSrc} alt={imageAlt} style={{ maxWidth: "75%" }} />
        <p className='text-gray-500 text-center'>{message}</p>
        <Button variant='outline' color='secondary' onClick={onButtonClick} className='w-[250px]'>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
