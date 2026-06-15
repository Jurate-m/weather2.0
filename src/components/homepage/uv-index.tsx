import Card from "@/components/ui/card";
import GradientBar from "@/components/ui/gradient-bar";
import { uv_recommendations } from "@/utils/functions";

export default function UvIndex({
  pos,
  className,
}: {
  pos: number;
  className?: string;
}) {
  const index = Math.round(pos);

  const uvIndex = uv_recommendations.filter((item) =>
    item.range.includes(index),
  );

  return (
    <Card className={["shadow-md shadow-shdw/10", className].join(" ")}>
      <div className='flex justify-between'>
        <h2 className='font-semibold text-lg'>UV Index</h2>
        <p className='text-sm'>{uvIndex && uvIndex[0].category}</p>
      </div>
      <p className='text-4xl'>{index}</p>
      <p className='pb-4 font-light'>{uvIndex && uvIndex[0].recommendation}</p>
      <GradientBar pos={pos} />
    </Card>
  );
}
