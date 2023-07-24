interface props {
  tags: Array<string>;
}
export default function FlowerEdit({ tags }: props) {
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
        className="text-xl border-2 border-black p-2"
      />

      <input
        type="text"
        name="alt"
        placeholder="alt text"
        className="text-xl border-2 border-black p-2"
      />
      <textarea
        rows={3}
        name="description"
        placeholder="Description"
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
      <div className="flex flex-col">
        {tags.map((v: string) => {
          return (
            <div>
              <input type="checkbox" name={`tag${v}`} key={v} id={v} />
              <label htmlFor={v}>{v}</label>
            </div>
          );
        })}
      </div>
    </form>
  );
}
