import Flower from "./flower";

let example_info: FlowerInfo = {
  id: "0",
  title: "Anemone",
  alt: "The white flower Anemone",
  price: 49.99,
};

export default function Flowers() {
  let example_ids = [0, 1, 2, 3, 4];
  return (
    <section className="grid grid-cols-4 gap-8">
      {/* <Flower info={example_info} />, we want the value not variable */}
      {example_ids.map((v) => {
        example_info.id = v.toString();
        return <Flower {...example_info} key={v} />;
      })}
    </section>
  );
}
