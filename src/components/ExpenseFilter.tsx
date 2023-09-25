import categories from "../categories";

interface Props {
  onFilter: (category: string) => void;
}

const ExpenseFilter = ({ onFilter }: Props) => {
  return (
    <select
      className="form-select"
      onChange={(event) => onFilter(event.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default ExpenseFilter;
