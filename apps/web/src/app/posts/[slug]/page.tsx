export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="custom_container">
      {slug}
      <div className="w-20 h-20 rounded-full bg-gray-500"></div>
      <a href="#" className="text-lg link">
        Author name
      </a>
      <p className="text-gray-400">2 feb 25</p>
      <h2 className="text-2xl mt-3">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda nisi
        cupiditate
      </h2>
      <div className="divider"></div>
      <p>
        Excepteur qui mollit mollit culpa ex officia. Minim cupidatat cupidatat
        et esse eiusmod aliquip nisi irure et est irure eiusmod ullamco nulla.
        Voluptate sunt consectetur aliquip nostrud voluptate est eiusmod. Ipsum
        aliqua exercitation aliquip est minim officia magna non magna irure
        consequat. Non dolore enim minim exercitation reprehenderit qui dolor
        consectetur. Id ipsum consectetur consectetur labore Lorem do commodo
        cillum. Adipisicing culpa culpa elit aliqua nostrud sint nulla veniam
        anim nostrud occaecat. Magna sint sunt non aute amet adipisicing. Anim
        officia quis velit adipisicing elit. In dolore aute incididunt
        consectetur nisi reprehenderit elit. Nulla nisi ipsum velit incididunt
        anim incididunt ad ipsum commodo nulla. Duis eiusmod laboris magna ea
        minim nisi consectetur eiusmod excepteur. Nulla ipsum non eiusmod
        laboris dolore ea reprehenderit proident. Minim fugiat sunt eiusmod
        sunt.
      </p>
    </div>
  );
}
