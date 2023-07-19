export default function FlowerEdit() {
  return (
    <form className="flex flex-col gap-2 w-64 flowerEdit">
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="text-xl border-2 border-black p-2"
      />
      <input
        type="file"
        name="img"
        id=""
        className="text-xl border-2 border-black p-2"
      />

      <input
        type="text"
        name="alt"
        placeholder="alt text"
        className="text-xl border-2 border-black p-2"
      />
      <input
        type="number"
        name="price"
        id="price"
        min={0}
        placeholder="Price"
        className="text-xl border-2 border-black p-2"
      />
      <input
        type="number"
        name="salePrice"
        placeholder="Sale price"
        min={0}
        className="text-xl border-2 border-black p-2"
      />
    </form>
  );
}
