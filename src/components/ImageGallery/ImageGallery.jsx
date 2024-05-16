
export default function ImageGallery({ items }) {
  console.log(items);
    return (
        <ul>
          { items.map((item) => (
            <li key={item.id}>
              <div>
               <img src={item.urls.small} alt={item.alt_description} />
              </div>
            </li>
          ))}
        </ul>
    )
}