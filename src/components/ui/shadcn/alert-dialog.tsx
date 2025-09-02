import { Button } from '~/components/ui/shadcn/button'

interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  destructive?: boolean
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  destructive = false,
}: AlertDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <button
        type="button"
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => {
          onCancel()
          onOpenChange(false)
        }}
      />

      {/* Dialog */}
      <div className="relative mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
            <p className="mt-2 text-gray-500 text-sm">{description}</p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="ghost"
              onClick={() => {
                onCancel()
                onOpenChange(false)
              }}
            >
              {cancelText}
            </Button>
            <Button
              variant={destructive ? 'destructive' : 'default'}
              onClick={() => {
                onConfirm()
                onOpenChange(false)
              }}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
