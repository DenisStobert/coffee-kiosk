let cashinHandler;
let vendCallback = null;
let cardKeyHandler = null;
let cardTriggered = false;

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

  BankCardPurchase(amount, cb, display_cb) {
    if (cardKeyHandler) return; // уже активен
    cardTriggered = false;

    display_cb("Приложите карту");
    this._cardCallback = cb;
    this._cardDisplayCb = display_cb;

    cardKeyHandler = function (e) {
      const key = e.key.toLowerCase();
      if (cardTriggered) return;

      if (key === "a") {
        cardTriggered = true;
        emulator.__triggerCardRead(true);
      }
      if (key === "d") {
        cardTriggered = true;
        emulator.__triggerCardRead(false);
      }
    };

    window.addEventListener("keydown", cardKeyHandler);
  },

  BankCardCancel() {
    if (cardKeyHandler && !cardTriggered) {
      window.removeEventListener("keydown", cardKeyHandler);
      cardKeyHandler = null;
      this._cardCallback = null;
      this._cardDisplayCb = null;
      cardTriggered = false;
    }
  },

  __triggerCardRead(success) {
    if (!this._cardCallback || !this._cardDisplayCb) return;

    window.removeEventListener("keydown", cardKeyHandler);
    cardKeyHandler = null;

    this._cardDisplayCb("Связь с банком");
    setTimeout(() => {
      this._cardDisplayCb("Получение результата");
      setTimeout(() => {
        this._cardCallback(success);
        this._cardCallback = null;
        this._cardDisplayCb = null;
        cardTriggered = false;
      }, 1000);
    }, 1000);
  },

  Vend(product_idx, cb) {
    vendCallback = cb;
    window.addEventListener("keydown", handleVendKeys);
  },
};

function handleVendKeys(e) {
  const key = e.key.toLowerCase();
  if (key === "y" || key === "н") {
    vendCallback?.(true);
    cleanupVend();
  }
  if (key === "x" || key === "ч") {
    vendCallback?.(false);
    cleanupVend();
  }
}

function cleanupVend() {
  vendCallback = null;
  window.removeEventListener("keydown", handleVendKeys);
}
