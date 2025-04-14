let cashinHandler;
let vendCallback = null;
let vendListenerAdded = false;

export const emulator = {
  StartCashin(cb) {
    cashinHandler = function (e) {
      if (e.key === "1") cb(10);
      if (e.key === "2") cb(50);
      if (e.key === "3") cb(100);
    };
    window.addEventListener("keydown", cashinHandler);
  },

  StopCashin() {
    if (cashinHandler) {
      window.removeEventListener("keydown", cashinHandler);
      cashinHandler = null;
    }
  },

  BankCardPurchase(amount, cb, display_cb, isSuccess) {
    display_cb("Обработка карты");
    setTimeout(() => display_cb("Связь с банком"), 2000);
    setTimeout(() => {
      display_cb(isSuccess ? "Оплата успешна" : "Ошибка оплаты");
      cb(isSuccess);
    }, 3000);
  },

  BankCardCancel() {
    console.log("Операция по карте отменена");
  },

  Vend(product_idx, cb) {
    vendCallback = cb;

    if (!vendListenerAdded) {
      window.addEventListener("keydown", handleVendKeys);
      vendListenerAdded = true;
    }
  },
};

function handleVendKeys(e) {
  if (e.key === "x" || e.key === "ч") {
    vendCallback?.(true);
    cleanupVend();
  }
  if (e.key === "y" || e.key === "н") {
    vendCallback?.(false);
    cleanupVend();
  }
}

function cleanupVend() {
  vendCallback = null;
  window.removeEventListener("keydown", handleVendKeys);
  vendListenerAdded = false;
}
