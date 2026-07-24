import ProductCard from "./ProductCard";

/**
 * ProductGrid — lays out a list of products using ProductCard.
 *
 * Props:
 *   products: Array<Product>   (see ProductCard for the shape)
 *   actionLabel?: string
 *   onAction?: (product) => void
 */
export default function ProductGrid({ products, actionLabel, onAction }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id ?? product.name} product={product} actionLabel={actionLabel} onAction={onAction} />
      ))}
    </div>
  );
}
