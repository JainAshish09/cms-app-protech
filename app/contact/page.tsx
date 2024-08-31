import MainContainer from "../features/main-container";

export default function contact() {

  const title = "PRO-TECH®: developed for maximum efficiency";

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
  ];

  return <div>
    <div>
      <MainContainer title={title} breadcrumbs={breadcrumbs} />
    </div>
    <div className="container mx-auto">

      This is a contact
    </div>
  </div>
}