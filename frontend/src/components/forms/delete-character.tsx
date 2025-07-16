import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export default function DeleteCharacter({
  charID,
  setIsDeleted,
}: { charID: string } & { setIsDeleted: (value: boolean) => void }) {
  const token = localStorage.getItem('token');
  const handleDelete = async () => {
    if (!token) return;

    const { ok } = await fetch(`${API_URL}/characters/${charID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (ok) {
      setIsDeleted(true);
    } else {
      console.error('Failed to delete character');
    }
  };

  return (
    <div className="absolute top-4 right-4">
      <AlertDialog>
        <AlertDialogTrigger>
          <Trash
            size={20}
            className="cursor-pointer text-red-400 hover:text-red-300"
          />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-purple-100">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-purple-200">
              This action cannot be undone. This will permanently delete your character
              and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-purple-200 hover:text-purple-100 cursor-pointer border-0">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-gradient-to-b from-red-900 via-red-700 to-red-500 text-red-200 hover:text-white cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
