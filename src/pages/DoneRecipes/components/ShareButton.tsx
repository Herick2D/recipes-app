import { Button } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

type ShareButtonProps = {
  recipeType: string,
  recipeId: string,
  index: number;
  setCopied: React.Dispatch<React.SetStateAction<boolean>>;
};

function ShareButton({ recipeType, recipeId, index, setCopied }: ShareButtonProps) {
  const handleClipBoard = async (type: string, id:string) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Erro ao copiar o link');
    }
  };

  return (
    <Button
      onClick={ () => handleClipBoard(recipeType, recipeId) }
    >
      <ShareIcon
        data-testid={ `${index}-horizontal-share-btn` }
      />
    </Button>
  );
}

export default ShareButton;
