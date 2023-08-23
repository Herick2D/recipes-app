import useCategories from '../../../hooks/useCategories';

function CategoriesButtons() {
  const { categories } = useCategories();

  return (
    <div>
      {categories.slice(0, 5).map((category) => (
        <button
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          key={ category.strCategory }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

export default CategoriesButtons;
