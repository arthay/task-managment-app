class StorageService {
  private storage: Storage;

  constructor(private readonly storageKey: string) {
    this.storage = localStorage;
    this.storageKey = storageKey;
  }

  getItem<TItem>(): TItem | null {
    try {
      const storageItem = this.storage.getItem(this.storageKey);

      return storageItem ? JSON.parse(storageItem) : null;
    } catch {
      this.removeItem();

      return null;
    }
  }

  setItem<TItem>(item: TItem) {
    this.storage.setItem(this.storageKey, JSON.stringify(item));
  }

  removeItem() {
    this.storage.removeItem(this.storageKey);
  }
}

export default StorageService;
