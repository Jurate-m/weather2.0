import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/card";

type RequestConsentType = {
  acceptHandler: () => void;
  denyHandler: () => void;
};

export default function RequestConsent({
  acceptHandler,
  denyHandler,
}: RequestConsentType) {
  return (
    <Card className='text-center shadow-md shadow-shdw/10 '>
      <Icon iconId={3} className='w-50 mx-auto' aspectRatio='aspect-2/1' />
      <div className='sm:p-4 w-2xl mx-auto max-w-full'>
        <h1 className='text-2xl pb-4 font-bold'>
          Allow to use your location for local weather?
        </h1>
        <p className='pb-8'>
          We store your approximate location in a temporary cookie to show local
          weather. It is not shared with third parties.
        </p>

        <div className='flex gap-4 justify-center'>
          <Button
            onClick={denyHandler}
            label='No thanks'
            className='block py-2 px-4 rounded-lg border-2 border-red-700 text-font-2 hover:bg-red-700 hover:text-white focus:bg-red-700 focus:text-white font-semibold text-semibold'
          />
          <Button
            onClick={acceptHandler}
            label='Allow'
            className='block py-2 px-4 rounded-lg border-2 border-green-700  text-font-2 hover:bg-green-700 hover:text-white focus:bg-green-700 focus:text-white font-semibold text-semibold'
          />
        </div>
      </div>
    </Card>
  );
}
