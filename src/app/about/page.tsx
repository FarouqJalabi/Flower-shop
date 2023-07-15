import Employe from "./employe";
export default function Home() {
  return (
    <main>
      <section className="grid grid-cols-2 gap-8 px-8">
        <Employe />
        <Employe />
        <Employe />
      </section>
    </main>
  );
}
