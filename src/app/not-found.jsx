import NotFound from "@/Components/not-found/not-found";

export default function NotFoundPage() {
  return (
    <NotFound
      title="Page introuvable"
      message="Erreur 404 - La page que vous recherchez n'existe pas."
     />
  );
}