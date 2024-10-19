export default function CTA({ text }: { text: string }) {
  return (
    <div className="mb-4 h-8 lg:h-[54px] bg-brown-light-500 w-fit px-5 lg:px-6 flex items-center justify-center rounded-full">
      <p className="text-xs text-brown-dark-2100 lg:text-sm">{text} </p>
    </div>
  );
}
