import Icon from "@/components/ui/Icon";

type RejectedConsentType = {
  message?: React.ReactNode;
  acceptHandler?: () => void;
};

export default function RejectedConsent({
  message,
  acceptHandler,
}: RejectedConsentType) {
  return (
    <section className='max-w-full w-5xl mx-auto px-5'>
      <h1 className='text-2xl pb-2 font-semibold'>
        Unfortunatelly we couldn't retrieve your location.{" "}
      </h1>
      <div className='flex'>
        <div>
          {message}
          <p>
            Feel free to use the search form to search for desired location
            forecast.
          </p>

          {!message && (
            <>
              <p className='pb-4'>
                If you would like to see forecasts for your area, you can grant
                permission to use your location for local forecast.
              </p>
              <button
                onClick={acceptHandler}
                className='block py-2 px-4 rounded-lg bg-emerald-700 hover:bg-green-700 focus:bg-green-700 text-white font-semibold'
              >
                Grant permission
              </button>
            </>
          )}
        </div>
        <div>
          <Icon iconId={6} />
        </div>
      </div>
    </section>
  );
}
