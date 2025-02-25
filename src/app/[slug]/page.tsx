import Image from "next/image";
import { notFound } from "next/navigation";

import ConsumptionMethodOption from "@/app/[slug]/components/consumption-method-option";
import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      <div className="space-y-2 pt-24 text-center">
        {/* LOGO E TITULO */}
        <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
        {/* BEM VINDO */}
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>
      {
        //TODO: ADD UMA NOVA COLUNA PARA MÉTODO DELIVERY}
      }
      <div className="pt 14 grid grid-cols-2 gap-4">
        <ConsumptionMethodOption
          slug={slug}
          imageUrl="/dine_in.png"
          imageAlt="Comer aqui"
          buttonText="Para comer aqui"
          option="DINE_IN"
        />
        <ConsumptionMethodOption
          slug={slug}
          imageUrl="/takeaway.png"
          imageAlt="Para levar"
          buttonText="Para levar"
          option="TAKEAWAY"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
