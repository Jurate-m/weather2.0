export default function Search({ fill }: { fill?: string }) {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.65082 14.6134C11.3237 14.6134 14.3016 11.5657 14.3016 7.8067C14.3016 4.0477 11.3237 1 7.65082 1C3.97791 1 1 4.0477 1 7.8067C1 11.5657 3.97791 14.6134 7.65082 14.6134Z'
        stroke={fill ?? "#000"}
        strokeWidth='2'
        strokeMiterlimit='10'
      />
      <path
        d='M12.343 12.9363L16.1418 16.5497'
        stroke={fill ?? "#000"}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
