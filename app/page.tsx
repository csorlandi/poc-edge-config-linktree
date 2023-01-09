import Image from 'next/image';
import { VscTwitter, VscGithub } from 'react-icons/vsc';
import { get } from '@vercel/edge-config';

type Links = {
  title: string;
  href: string;
  image?: string;
};

type Socials = {
  title: string;
  href: string;
};

type Response = {
  name: string;
  avatar: string;
  links: Links[];
  socials: Socials[];
};

function LinkCard({
  href,
  title,
  image,
}: {
  href: string;
  title: string;
  image?: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center p-1 rounded-md w-full hover:scale-[1.025] transition-all bg-gray-100 mb-3 max-w-3xl"
    >
      <div className="flex text-center w-full">
        <div className="w-10 h-10">
          {image && (
            <Image
              className="rounded-sm"
              src={image}
              width={40}
              height={40}
              alt={title}
            />
          )}
        </div>
        <h2 className="flex justify-center items-center font-semibold w-full text-gray-700 -ml-10">
          {title}
        </h2>
      </div>
    </a>
  );
}

export default async function Page() {
  const data = await get<Response>('linktree');

  if (!data) return <p>Run to the forest guys...</p>;

  return (
    <div className="flex flex-col items-center justify-center mx-auto w-full mt-16 px-8">
      <Image
        className="rounded-full"
        src={data.avatar}
        width={100}
        height={100}
        alt={data.name}
      />
      <h1 className="font-semibold mt-4 mb-8 text-xl text-white">
        {data.name}
      </h1>
      {data?.links.map(link => (
        <LinkCard key={link.href} {...link} />
      ))}
      <div className="flex gap-4 items-center mt-8 text-white">
        {data?.socials.map(social => (
          <a
            key={social.href}
            href={social.href}
            className="hover:scale-125 transition-all"
          >
            {social.href.includes('twitter') && <VscTwitter fontSize={36} />}
            {social.href.includes('github') && <VscGithub fontSize={32} />}
          </a>
        ))}
      </div>
    </div>
  );
}
