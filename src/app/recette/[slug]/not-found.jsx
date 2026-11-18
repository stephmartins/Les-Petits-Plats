import NotFound from "@/Components/not-found/not-found";

export default function NotFoundPage() {
  return (
    <NotFound
      title="Recette introuvable"
      message="La recette que vous recherchez n'existe pas."
      />
  );
}