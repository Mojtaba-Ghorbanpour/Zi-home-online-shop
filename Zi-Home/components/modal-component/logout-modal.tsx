import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  addToast,
} from "@heroui/react";

const LogoutModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleLogout = () => {
    localStorage.clear();
    addToast({
      title: `خدانگهدار`,
      color: "warning",
      timeout: 3000,
      shouldShowTimeoutProgress: true,
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };
  return (
    <>
      <Button
        onClick={onOpen}
        isIconOnly
        variant="light"
        fullWidth
        className="w-full font-semibold text-medium flex justify-start"
        size="sm"
      >
        خروج
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xs"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center text-lg">
                خروج از حساب کاربری
              </ModalHeader>
              <ModalBody>
                <p className="text-center text-natural-500 text-base">
                  آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟ پس
                  از خروج، برای استفاده دوباره باید وارد شوید.
                </p>
              </ModalBody>
              <ModalFooter className="w-full flex items-center justify-center">
                <Button
                  color="default"
                  variant="light"
                  onClick={onClose}
                  className="font-semibold"
                >
                  لغو
                </Button>
                <Button
                  color="danger"
                  onClick={handleLogout}
                  className="font-semibold"
                >
                  خروج
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogoutModal;
