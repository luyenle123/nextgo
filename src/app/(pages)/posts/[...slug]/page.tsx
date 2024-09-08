export default function Page({ params }) {
    return <div>My Post: {params.slug.length}, {JSON.stringify(params)}</div>
  }