function Test0TailWindCSS(): React.JSX.Element {
  return (
    <section className="bg-gray-800 rounded-xl text-white p-4 w-3/5">
      <p className="bg-amber-500 rounded-xl p-3 text-black">
        Test0: TailWindCSS
      </p>

      <p>Try to make playing card</p>

      <article className="flex flex-col justify-between items-center bg-white h-80 rounded-3xl text-black p-4 w-80">
        <p>2 of hearts</p>
        <p>2 of hearts</p>
        <p>2 of hearts</p>
      </article>
    </section>
  );
}

export default function Exp0TailWindCSS(): React.JSX.Element {
  return (
    <div className="h-full w-full">
      <p className="bg-fuchsia-950 rounded-xl p-3 text-white">
        Exp0: TailWind CSS
      </p>

      <section className="h-full w-full flex justify-center items-center">
        <Test0TailWindCSS />
      </section>
    </div>
  );
}
