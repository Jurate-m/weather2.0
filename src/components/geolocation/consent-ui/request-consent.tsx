type RequestConsentType = {
  acceptHandler: () => void;
  denyHandler: () => void;
};

export default function RequestConsent({
  acceptHandler,
  denyHandler,
}: RequestConsentType) {
  return (
    <section className='narrow'>
      <h1 className='text-2xl pb-2 font-semibold'>
        Allow to use your location for local weather?
      </h1>
      <p className='pb-4'>
        We store your approximate location in a temporary cookie to show local
        weather. It is not shared with third parties.
      </p>
      <ul className='flex -mx-2'>
        <li className='px-4'>
          <button
            onClick={denyHandler}
            className='block py-2 px-4 rounded-lg bg-red-700 hover:bg-red-600 focus:bg-red-600 text-white font-semibold'
          >
            No thanks
          </button>
        </li>
        <li className='px-2'>
          <button
            onClick={acceptHandler}
            className='block py-2 px-4 rounded-lg bg-emerald-700 hover:bg-green-700 focus:bg-green-700 text-white font-semibold'
          >
            Allow
          </button>
        </li>
      </ul>
    </section>
  );
}
