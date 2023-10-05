"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface prop {
  initSearch?: string;
}
export default function SearchBox({ initSearch }: prop) {
  const { replace } = useRouter();
  const search = (e: React.FormEvent<HTMLFormElement>) => {
    let formObject = new FormData(e.currentTarget as HTMLFormElement);
    let formData = Object.fromEntries(formObject) as Record<string, any>;

    const searchTo = `/search/1?search=${formData.search}`;
    console.log(searchTo);
    // replace(searchTo);
  };

  return (
    <form className="mx-auto m-2 w-4/5 max-w-2xl flex" onSubmit={search}>
      <input
        type="text"
        name="search"
        className="border-gray-600 border-2 p-2 border-e-0 rounded-s-md w-full  focus:outline-none"
        placeholder="Search..."
        defaultValue={initSearch}
      />
      <Link
        href="/search/1234"
        type="submit"
        className="bg-black text-white p-2.5 rounded-e-md"
      >
        Search
      </Link>
    </form>
  );
}
