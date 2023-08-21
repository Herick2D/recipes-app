type CardProps = {
  index: number;
  name: string;
  thumbnail: string;
};

function Card({ index, name, thumbnail }: CardProps) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ thumbnail } alt={ name } />
      <h3 data-testid={ `${index}-card-name` }>{ name }</h3>
    </div>
  );
}

export default Card;
