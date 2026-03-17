export default async function CurrentWeather({
  validLocation,
  location,
  coords,
}: {
  validLocation: boolean | undefined;
  location: string | undefined;
  coords: string | undefined;
}) {
  "use cache";

  if (!validLocation && !coords) return;

  if (validLocation && location) {
    return <div>Current weather</div>;
  }

  if (!validLocation && coords) {
    return <div>Coords location weather</div>;
  }
}
