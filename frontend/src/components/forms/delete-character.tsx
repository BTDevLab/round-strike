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

export default function DeleteCharacter() {
  return (
    <div className="absolute top-4 right-4">
      <AlertDialog>
        <AlertDialogTrigger>
          <button className="cursor-pointer text-red-400 hover:text-red-300">
            <Trash size={20} />
          </button>
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
            <AlertDialogCancel className="bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-purple-100 cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-purple-100 cursor-pointer">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
