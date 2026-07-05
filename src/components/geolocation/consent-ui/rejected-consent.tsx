import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/card";
import Button from "@/components/ui/Button";

type RejectedConsentType = {
  message?: React.ReactNode;
  acceptHandler: () => void;
};

export default function RejectedConsent({
  message,
  acceptHandler,
}: RejectedConsentType) {
  return (
    <Card className='text-center shadow-md shadow-shdw'>
      <Icon
        iconId={message ? 8 : 6}
        className='w-50 mx-auto'
        aspectRatio='aspect-2/1'
      />

      <div className='sm:p-4 w-2xl mx-auto max-w-full'>
        <h1 className='text-2xl pb-4 font-bold'>
          Unfortunatelly we couldn't retrieve your location.{" "}
        </h1>
        {message && <p className='pb-4'>{message}</p>}
        <p className='pb-2'>
          {message ? "Otherwise, f" : "F"}eel free to use the search form to
          search for desired location forecast.
        </p>
        {!message && (
          <>
            <p className='pb-8'>
              If you would like to see forecasts for your area, you can grant
              permission to use your location for local forecast.
            </p>
            <Button
              label='Grant permission'
              onClick={acceptHandler}
              className='block py-2 px-4 rounded-lg bg-emerald-700 hover:bg-green-700 focus:bg-green-700 text-white font-semibold mx-auto'
            />
          </>
        )}
      </div>
    </Card>
  );
}
